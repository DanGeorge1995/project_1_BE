import { hashPassword } from "../modules/auth";
import { userWithoutRefreshToken } from "../helpers";
import prisma from "./db";

export const createUser = async (req) =>
  prisma.user.create({
    data: {
      username: req.body.username,
      password: await hashPassword(req.body.password),
      email: req.body.email,
    },
  });

export const updateAuthUser = async (id, refreshToken) =>
  prisma.user.update({
    where: { id: id },
    data: { refresh_token: refreshToken },
  });

export const findUserBy = async (email) =>
  prisma.user.findUnique({
    where: {
      email: email,
    },
    select: {
      ...userWithoutRefreshToken,
    },
  });

export const findUserByRefreshToken = async (refreshToken) =>
  prisma.user.findUnique({
    where: {
      refresh_token: refreshToken,
    },
  });

export const removeRefreshToken = async (refreshToken) =>
  prisma.user.update({
    where: { refresh_token: refreshToken },
    data: { refresh_token: null },
  });
