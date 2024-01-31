import prisma from "../db";
import { comparePasswords, createJWT, hashPassword } from "../modules/auth";

export const registerUser = async (req, res, next) => {
  try {
    const createdUser = await prisma.user.create({
      data: {
        username: req.body.username,
        password: await hashPassword(req.body.password),
        email: req.body.email,
      },
    });

    const accessToken = createJWT(createdUser, process.env.ACCESS_TOKEN_SECRET, "30s");
    const refreshToken = createJWT(createdUser, process.env.REFRESH_TOKEN_SECRET, "1min");

    const user = await prisma.user.update({
      where: { id: createdUser.id },
      data: { refresh_token: refreshToken },
    });
    res.cookie("refresh_token", refreshToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
    res.json({ accessToken });
  } catch (err) {
    console.log(err);
    err.type = "input";
    next(err);
  }
};

export const loginUser = async (req, res, next) => {
  // try {
  //// do here the login logic
  //// similar  to registerUser function
  //// first: find user in db, if it doesn't exist,  send error message back to client
  //// if it exist, create tokens and follow the logic as on register
  // } catch (err) {
  //   next(err);
  // }
};

export const getUsers = async (req, res, next) => {
  try {
    const users = await prisma.user.findMany();
    res.json({ users: users });
  } catch (err) {
    next(err);
  }
};
