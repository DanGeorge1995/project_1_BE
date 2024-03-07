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
