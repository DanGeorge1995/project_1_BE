import { ErrorMessages } from "../../errors/enums";

export const userIdValidationSchema = {
  trim: true,
  notEmpty: {
    errorMessage: ErrorMessages.EMPTY_FIELD,
    bail: true,
  },
  escape: true,
};

export const descriptionValidationSchema = {
  trim: true,
  notEmpty: {
    errorMessage: ErrorMessages.EMPTY_FIELD,
    bail: true,
  },
  escape: true,
};

export const nameValidationSchema = {
  trim: true,
  notEmpty: {
    errorMessage: ErrorMessages.EMPTY_FIELD,
    bail: true,
  },
  escape: true,
};
