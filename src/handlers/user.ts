import prisma from "../db";
import { comparePasswords, createJWT, hashPassword } from "../modules/auth";

export const registerUser = async (req, res, next) => {
  console.log({ body: req.body });
  try {
    const user = await prisma.user.create({
      data: {
        username: req.body.username,
        password: await hashPassword(req.body.password),
        email: req.body.email,
      },
    });
    // const token = createJWT(user);
    // res.json({ token });
    res.json({ user });
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
        username: req.body.username,
      },
    });

    const isValid = await comparePasswords(req.body.password, user.password);

    if (!isValid) {
      res.status(401);
      res.json({ message: "Nope" });
      return;
    }

    const token = createJWT(user);
    res.json({ token });
  } catch (err) {
    next(err);
  }
};

export const getUsers = async (req, res, next) => {
  try {
    const users = await prisma.user.findMany();
    res.json({ users: users });
  }
  catch (err) {
    next(err);
  }
}
