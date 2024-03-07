import { checkSchema } from "express-validator";
import { descriptionValidationSchema, nameValidationSchema, userIdValidationSchema } from "../fieldSchemas";

export const createActivitySchema = {
  user_id: userIdValidationSchema,
  name: nameValidationSchema,
  description: descriptionValidationSchema,
};

export const validateCreateActivity = () => {
  return checkSchema(createActivitySchema, ["body"]);
};
