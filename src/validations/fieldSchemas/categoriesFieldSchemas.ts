import { ErrorMessages } from "../../errors/enums";

export const categoryIdValidationSchema = {
  trim: true,
  exists: true,
  notEmpty: {
    errorMessage: ErrorMessages.EMPTY_FIELD,
    bail: true,
  },
  escape: true,
};
