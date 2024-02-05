import prisma from "../db";
import { comparePasswords, createJWT, hashPassword } from "../modules/auth";
import { userWithoutRefreshToken } from "../helpers";

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

    await prisma.user.update({
      where: { id: createdUser.id },
      data: { refresh_token: refreshToken },
    });
    res.cookie("refresh_token", refreshToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
    res.status(200).json({ ...createdUser, accessToken });
  } catch (err) {
    console.log(err);
    err.type = "input";
    next(err);
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: req.body.email,
      },
      select: {
        ...userWithoutRefreshToken,
      },
    });
    if (!user) {
      res.status(404).json({ message: "Wrong email" });
    }

    const isValidPassword = await comparePasswords(req.body.password, user.password);
    if (!isValidPassword) {
      res.status(404).json({ message: "Wrong password" });
    }

    const accessToken = createJWT(user, process.env.ACCESS_TOKEN_SECRET, "30s");
    const refreshToken = createJWT(user, process.env.REFRESH_TOKEN_SECRET, "1min");

    await prisma.user.update({
      where: { id: user.id },
      data: { refresh_token: refreshToken },
    });

    res.cookie("refresh_token", refreshToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
    res.json({ ...user, accessToken });
  } catch (err) {
    next(err);
  }
};

export const logoutUser = async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        refresh_token: req.body.refresh_token
      }
    });

    if (!user) {
      res.status(404).json({ message: 'User ID is missing in the request body' });
    }

    if (req.body.id) {
      await prisma.user.update({
        where: { id: req.body.id },
        data: { refresh_token: null },
      });
    } else {
      res.status(404).json({ message: "No id found !" })
    }

    res.clearCookie('refresh_token', { httpOnly: true, path: '/' });
    res.json({ message: 'Logout successfuly', ...user })

  } catch (err) {
    next(err);
  }
}

export const getUsers = async (req, res, next) => {
  try {
    const users = await prisma.user.findMany();
    if (!users) {
      res.status(404).json({ message: "No users found !" })
    }
    res.json({ ...users });
  } catch (err) {
    next(err);
  }
};
