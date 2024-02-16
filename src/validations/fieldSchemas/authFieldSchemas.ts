import { ErrorMessages } from "../../errors/enums";

export const emailValidationSchema = {
  trim: true,
  notEmpty: {
    errorMessage: ErrorMessages.EMPTY_FIELD,
    bail: true,
  },
  isEmail: {
    errorMessage: ErrorMessages.INVALID_EMAIL,
    bail: true,
  },
  escape: true,
};

export const usernameValidationSchema = {
  trim: true,
  notEmpty: {
    errorMessage: ErrorMessages.EMPTY_FIELD,
    bail: true,
  },
  escape: true,
};

export const passwordValidationSchema = {
  notEmpty: {
    errorMessage: ErrorMessages.EMPTY_FIELD,
    bail: true,
  },
  isLength: {
    options: { min: 8, max: 20 },
    errorMessage: ErrorMessages.PASSWORD_LENGTH,
  },
  escape: true,
};
