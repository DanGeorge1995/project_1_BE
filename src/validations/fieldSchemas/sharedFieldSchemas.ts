import { ErrorMessages } from "../../errors/enums";

export const userIdValidationSchema = {
  trim: true,
  notEmpty: {
    errorMessage: ErrorMessages.EMPTY_FIELD,
    bail: true,
  },
  escape: true,
};
