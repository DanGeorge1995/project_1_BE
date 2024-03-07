import { findActivityById, findCategoryById, findDuplicateActivity } from "../../../db/queries/activity";
import { ErrorMessages } from "../../../errors/enums";
import { prioritiesArray, statusesArray } from "../../../helpers";

// CUSTOM VALIDATIONS
const checkUniqueName = async (value, { req, location, path }) => {
  const duplicateActivity = await findDuplicateActivity(req);
  if (duplicateActivity.length > 0) {
    return Promise.reject();
  }
  return Promise.resolve();
};

const checkIdExistence = async (value, { req, location, path }) => {
  const activity = await findActivityById(req);
  if (!activity) {
    return Promise.reject();
  }
  return Promise.resolve();
};

const checkCategoryIdBodyExistence = async (value, { req, location, path }) => {
  const category = await findCategoryById(req);
  if (!category) {
    return Promise.reject();
  }
  return Promise.resolve();
};

const checkStatus = async (value, { req, location, path }) => {
  if (!statusesArray.includes(value)) {
    return Promise.reject();
  }
  return Promise.resolve();
};

const checkPriority = async (value, { req, location, path }) => {
  if (!prioritiesArray.includes(value)) {
    return Promise.reject();
  }
  return Promise.resolve();
};

const checkExpenses = async (value, { req, location, path }) => {
  const isValidFloat = /^-?\d+(\.\d+)?$/.test(value);
  if (value.length >= 1 && !isValidFloat) {
    return Promise.reject();
  }
  return Promise.resolve();
};

// SCHEMAS
export const activityNameCustomValidationSchema = {
  trim: true,
  notEmpty: {
    errorMessage: ErrorMessages.EMPTY_FIELD,
    bail: true,
  },
  custom: {
    options: checkUniqueName,
    errorMessage: ErrorMessages.DUPLICATE_ACTIVITY,
    bail: true,
  },
  escape: true,
};

export const activityIdCustomValidationSchema = {
  trim: true,
  exists: true,
  notEmpty: {
    errorMessage: ErrorMessages.EMPTY_FIELD,
    bail: true,
  },
  custom: {
    options: checkIdExistence,
    errorMessage: ErrorMessages.WRONG_ACTIVITY_ID,
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
    options: checkCategoryIdBodyExistence,
    errorMessage: ErrorMessages.WRONG_CATEGORY_ID,
    bail: true,
  },
  escape: true,
};

export const statusCustomValidationSchema = {
  trim: true,
  exists: true,
  notEmpty: {
    errorMessage: ErrorMessages.EMPTY_FIELD,
    bail: true,
  },
  custom: {
    options: checkStatus,
    errorMessage: ErrorMessages.WRONG_STATUS,
    bail: true,
  },
  escape: true,
};

export const priorityCustomValidationSchema = {
  trim: true,
  exists: true,
  notEmpty: {
    errorMessage: ErrorMessages.EMPTY_FIELD,
    bail: true,
  },
  custom: {
    options: checkPriority,
    errorMessage: ErrorMessages.WRONG_PRIORITY,
    bail: true,
  },
  escape: true,
};

export const estimatedExpensesCustomValidationSchema = {
  trim: true,
  custom: {
    options: checkExpenses,
    errorMessage: ErrorMessages.NOT_A_NUMBER,
    bail: true,
  },
  escape: true,
};
