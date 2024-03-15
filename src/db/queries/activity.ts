import prisma from "../db";

export const getActivities = async (req) => {
  const user_id = req.params.user_id;
  const category_id = req.body.category_id;
  // Query params for filtering
  const limit = parseInt(req.query.limit) || 10;
  const offset = parseInt(req.query.offset) || 0;
  // Query params for sorting
  const sortingOption = req.query.sortingOption || "created_at";
  const sortingType = req.query.sortingType || "desc";

  return prisma.activity.findMany({
    where: { user_id, category_id },
    take: limit,
    skip: offset,
    orderBy: [{ [sortingOption]: sortingType }],
  });
};

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
      id: {
        not: req.params.activity_id,
      },
    },
  });

export const findActivityById = async (req) =>
  await prisma.activity.findUnique({
    where: {
      id: req.params.activity_id,
      user_id: req.body.user_id,
      category_id: req.body.category_id,
    },
  });

export const findCategoryById = async (req) =>
  await prisma.category.findUnique({
    where: {
      id: req.body.category_id,
      user_id: req.body.user_id,
    },
  });

export const updateExistingActivity = async (req) =>
  prisma.activity.update({
    where: { id: req.params.activity_id, user_id: req.body.user_id, category_id: req.body.category_id },
    data: {
      name: req.body.name,
      description: req.body.description,
      status: req.body.status,
      priority: req.body.priority,
      estimated_expenses: parseFloat(req.body.estimated_expenses) || null,
    },
  });

export const deleteOneActivity = async (req) =>
  prisma.activity.delete({
    where: { id: req.params.activity_id, user_id: req.body.user_id, category_id: req.body.category_id },
  });
