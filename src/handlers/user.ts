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
    res.json({ accessToken, user });


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
        email: req.body.email
      }
    })
    if (!user) {
      res.status(404).json({ message: 'Wrong email' })
    }

    const isValidPassword = await comparePasswords(req.body.password, user.password);
    if (!isValidPassword) {
      res.status(404).json({ message: 'Wrong password' })
    }

    const accessToken = createJWT(user, process.env.ACCESS_TOKEN_SECRET, '30s');
    const refreshToken = createJWT(user, process.env.REFRESH_TOKEN_SECRET, '1min');

    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: { refresh_token: refreshToken },
    });

    res.cookie('refresh_token', refreshToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
    res.json({ accessToken, updatedUser });


  } catch (err) {
    next(err);
  }
};

export const logoutUser = async (req, res, next) => {
  try {
    const userToken = await prisma.user.findUnique({
      where: {
        refresh_token: req.body.refresh_token

      }
    });

    if (userToken) {
      if (req.body.id) {
        await prisma.user.update({
          where: { id: req.body.id },
          data: { refresh_token: null },
        });
      } else {
        console.error('User ID is missing in the request body');
      }
    }

    res.clearCookie('refresh_token', { httpOnly: true, path: '/' });
    res.json({ message: 'Logout successfuly', userToken })

  } catch (err) {

    next(err);
  }
}

export const getUsers = async (req, res, next) => {
  try {
    const users = await prisma.user.findMany();
    res.json({ users: users });
  } catch (err) {
    next(err);
  }
};
