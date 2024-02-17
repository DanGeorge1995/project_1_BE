import { findCategoryById, findDuplicateCategory } from "../../../db/queries/category";
import { ErrorMessages } from "../../../errors/enums";

const checkUniqueName = async (value, { req, location, path }) => {
  const duplicateCategory = await findDuplicateCategory(req);
  if (duplicateCategory.length > 0) {
    return Promise.reject();
  }
  return Promise.resolve();
};

const checkIdExistence = async (value, { req, location, path }) => {
  const category = await findCategoryById(req);
  console.log({ category });
  if (!category) {
    return Promise.reject();
  }
  return Promise.resolve();
};

export const categoryNameCustomValidationSchema = {
  trim: true,
  notEmpty: {
    errorMessage: ErrorMessages.EMPTY_FIELD,
    bail: true,
  },
  custom: {
    options: checkUniqueName,
    errorMessage: ErrorMessages.DUPLICATE_CATEGORY,
    bail: true,
  },
  escape: true,
};

export const categoryIdCustomValidationSchema = {
  trim: true,
  exists: true,
  notEmpty: {
    errorMessage: ErrorMessages.EMPTY_FIELD,
    bail: true,
  },
  custom: {
    options: checkIdExistence,
    errorMessage: ErrorMessages.WRONG_CATEGORY_ID,
    bail: true,
  },
  escape: true,
};
