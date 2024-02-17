import { ErrorMessages } from "../../errors/enums";

export const categoryNameValidationSchema = {
  trim: true,
  notEmpty: {
    errorMessage: ErrorMessages.EMPTY_FIELD,
    bail: true,
  },
  escape: true,
};

export const categoryIdValidationSchema = {
  trim: true,
  exists: true,
  notEmpty: {
    errorMessage: ErrorMessages.EMPTY_FIELD,
    bail: true,
  },
  escape: true,
};

export const categoryDescriptionValidationSchema = {
  trim: true,
  notEmpty: {
    errorMessage: ErrorMessages.EMPTY_FIELD,
    bail: true,
  },
  escape: true,
};
