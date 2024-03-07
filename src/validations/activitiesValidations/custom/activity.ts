import { findActivityById, findDuplicateActivity } from "../../../db/queries/activity";
import { ErrorMessages } from "../../../errors/enums";

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
