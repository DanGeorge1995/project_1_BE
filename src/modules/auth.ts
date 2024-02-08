import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { handleInvalidTokenResponse, handleUnauthorizedResponse } from "../errors/responses";
import config from "../config";

export const comparePasswords = (password, hash) => {
  return bcrypt.compare(password, hash);
};

export const hashPassword = (password) => {
  return bcrypt.hash(password, 5);
};

export const createJWT = (user, secret, expiration) => {
  const token = jwt.sign(
    {
      id: user.id,
      username: user.name,
      email: user.email,
    },
    secret,
    { expiresIn: expiration }
  );
  return token;
};

export const protect = (req, res, next) => {
  const bearer = req.headers.authorization;

  if (!bearer) {
    return handleUnauthorizedResponse(res);
  }

  const [, token] = bearer.split(" ");

  if (!token) {
    return handleInvalidTokenResponse(res);
  }

  try {
    const user = jwt.verify(token, config.accessTokenSecret);
    req.user = user;
    next();
  } catch (error) {
    console.error(error);
    return handleInvalidTokenResponse(res);
  }
};
