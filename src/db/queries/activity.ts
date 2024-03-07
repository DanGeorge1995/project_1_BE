import prisma from "../db";

export const createNewActivity = async (req) =>
  prisma.activity.create({
    data: {
      user: {
        connect: { id: req.body.user_id },
      },
      category: {
        connect: { id: req.body.category_id },
      },
      name: req.body.name,
      description: req.body.description,
    },
  });

export const findDuplicateActivity = async (req) =>
  await prisma.activity.findMany({
    where: {
      user_id: req.body.user_id,
      category_id: req.body.category_id,
      name: req.body.name,
    },
  });

export const findActivityById = async (req) =>
  await prisma.activity.findUnique({
    where: {
      user_id: req.body.user_id,
      category_id: req.body.category_id,
      id: req.params.activity_id,
    },
  });
