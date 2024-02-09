import prisma from "../db";

export const findDuplicateCategory = async (req) =>
  prisma.category.findMany({
    where: {
      user_id: req.body.id,
      name: req.body.name,
    },
  });

export const createNewCategory = async (req) =>
  prisma.category.create({
    data: {
      user: {
        connect: { id: req.body.user_id },
      },
      name: req.body.name,
      description: req.body.description,
    },
  });
