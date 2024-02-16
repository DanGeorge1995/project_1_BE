import { checkSchema } from "express-validator";
import { categoryDescriptionValidationSchema, categoryNameValidationSchema, userIdValidationSchema } from "../fieldSchemas";

export const createCategorySchema = {
  user_id: userIdValidationSchema,
  name: categoryNameValidationSchema,
  description: categoryDescriptionValidationSchema,
};

export const validateCreateCategory = () => {
  return checkSchema(createCategorySchema, ["body"]);
};
