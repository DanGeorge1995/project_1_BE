import { createNewCategory, findDuplicateCategory, updateExistingCategory } from "../db/queries/category";
import { handleDuplicateCategoryResponse } from "../errors/responses";

export const getAllCategories = async (req, res, next) => {
  // gell all categories
  // try {
  //   const category = await updateExistingCategory(req);
  //   res.status(200).json({ category });
  // } catch (err) {
  //   next(err);
  // }
};

export const getSpecificCategories = async (req, res, next) => {
  // get some specific categories based on Limit/Default 10, Offset/Default 0, sorted by Create Date A-Z/Z-A (Default: Z-A) / Update Date A-Z/Z-A (Default: Z-A) / Alphabetically A-Z/Z-A
  // try {
  //   const category = await updateExistingCategory(req);
  //   res.status(200).json({ category });
  // } catch (err) {
  //   next(err);
  // }
};

export const createCategory = async (req, res, next) => {
  try {
    console.log(req.body, req.params);
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
  // try {
  //   const category = await updateExistingCategory(req);
  //   res.status(200).json({ category });
  // } catch (err) {
  //   next(err);
  // }
};

export const deleteCategories = async (req, res, next) => {
  // try {
  //   const category = await updateExistingCategory(req);
  //   res.status(200).json({ category });
  // } catch (err) {
  //   next(err);
  // }
};
