import { checkSchema } from "express-validator";
import { descriptionValidationSchema, nameValidationSchema, userIdValidationSchema } from "../fieldSchemas";

export const createCategorySchema = {
  user_id: userIdValidationSchema,
  name: nameValidationSchema,
  description: descriptionValidationSchema,
};

export const validateCreateCategory = () => {
  return checkSchema(createCategorySchema, ["body"]);
};
