import prisma from "../db";

export const findDuplicateCategory = async (req) =>
  await prisma.category.findMany({
    where: {
      user_id: req.body.id,
      name: req.body.name,
    },
  });

  export const findCategoryById = async (req) =>
  await prisma.category.findUnique({
    where: {
      user_id: req.body.id,
      id: req.params.
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

export const updateExistingCategory = async (req) =>
  prisma.category.update({
    where: { id: req.params.category_id, user_id: req.body.user_id },
    data: {
      name: req.body.name,
      description: req.body.description,
    },
  });
