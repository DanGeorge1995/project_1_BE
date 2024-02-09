import prisma from "../db/db";
import { comparePasswords, createJWT } from "../modules/auth";
import config from "../config";
import { createUser, findUserBy, findUserByRefreshToken, removeRefreshToken, updateAuthUser } from "../db/queries/auth";
import { ErrorTypes } from "../errors/enums";
import { Cookies, SuccessMessages, refreshTokenCookieOptions } from "../helpers";
import { handleForbiddenResponse, handleUnauthorizedResponse, handleWrongCredentialsResponse } from "../errors/responses";

export const registerUser = async (req, res, next) => {
  try {
    const createdUser = await createUser(req);

    const accessToken = createJWT(createdUser, config.accessTokenSecret, config.accessTokenExpiration);
    const refreshToken = createJWT(createdUser, config.refreshTokenSecret, config.refreshTokenExpiration);

    await updateAuthUser(createdUser.id, refreshToken);

    res.cookie(Cookies.REFRESH_TOKEN, refreshToken, refreshTokenCookieOptions);
    res.status(200).json({ ...createdUser, accessToken });
  } catch (err) {
    console.log(err);
    err.type = ErrorTypes.INPUT;
    next(err);
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const user = await findUserBy(req.body.email);

    if (!user) {
      return handleWrongCredentialsResponse(res);
    }

    const isValidPassword = await comparePasswords(req.body.password, user.password);

    if (!isValidPassword) {
      return handleWrongCredentialsResponse(res);
    }

    const accessToken = createJWT(user, config.accessTokenSecret, config.accessTokenExpiration);
    const refreshToken = createJWT(user, config.refreshTokenSecret, config.refreshTokenExpiration);

    await updateAuthUser(user.id, refreshToken);

    res.cookie(Cookies.REFRESH_TOKEN, refreshToken, refreshTokenCookieOptions);
    res.json({ ...user, accessToken });
  } catch (err) {
    next(err);
  }
};

export const logoutUser = async (req, res, next) => {
  try {
    const cookiesRefreshToken = req.cookies?.refresh_token;
    if (!cookiesRefreshToken) {
      return handleUnauthorizedResponse(res);
    }
    const user = await findUserByRefreshToken(cookiesRefreshToken);

    if (!user) {
      return handleForbiddenResponse(res);
    }

    await removeRefreshToken(cookiesRefreshToken);

    res.clearCookie(Cookies.REFRESH_TOKEN);
    res.status(200).json({ message: SuccessMessages.LOGOUT });
  } catch (err) {
    next(err);
  }
};

export const getUsers = async (req, res, next) => {
  try {
    const users = await prisma.user.findMany();
    if (!users) {
      res.status(404).json({ message: "No users found !" });
    }
    res.json({ ...users });
  } catch (err) {
    next(err);
  }
};
