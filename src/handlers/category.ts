import { createNewCategory, deleteOneCategory, findDuplicateCategory, getCategories, updateExistingCategory } from "../db/queries/category";
import { handleDuplicateCategoryResponse } from "../errors/responses";

export const getMultipleCategories = async (req, res, next) => {
  try {
    const categories = await getCategories(req);
    res.status(200).json({ categories });
  } catch (err) {
    next(err);
  }
};

export const createCategory = async (req, res, next) => {
  try {
    const userCategoryDuplicate = await findDuplicateCategory(req);

    if (userCategoryDuplicate.length > 0) {
      return handleDuplicateCategoryResponse(res);
    }

    const newCategory = await createNewCategory(req);

    res.status(200).json({ newCategory });
  } catch (err) {
    next(err);
  }
};

export const updateCategory = async (req, res, next) => {
  try {
    const category = await updateExistingCategory(req);
    res.status(200).json({ category });
  } catch (err) {
    next(err);
  }
};

export const deleteCategory = async (req, res, next) => {
  try {
    await deleteOneCategory(req);
    res.status(200).json({ message: "Category successful deleted" });
  } catch (err) {
    next(err);
  }
};

export const deleteCategories = async (req, res, next) => {};
