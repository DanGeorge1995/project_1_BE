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
      id: req.params.category_id,
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

export const deleteOneCategory = async (req) =>
  prisma.category.delete({
    where: { id: req.params.category_id, user_id: req.body.user_id },
  });

export const getCategories = async (req) => {
  const user_id = req.params.user_id;
  // Query params for filtering
  const limit = parseInt(req.query.limit) || 10;
  const offset = parseInt(req.query.offset) || 0;
  // Query params for sorting
  const sortingOption = req.query.sortingOption || "created_at";
  const sortingType = req.query.sortingType || "desc";

  return prisma.category.findMany({
    where: { user_id },
    take: limit,
    skip: offset,
    orderBy: [{ [sortingOption]: sortingType }],
  });
};
