import { checkSchema } from "express-validator";
import { categoryDescriptionValidationSchema, categoryIdValidationSchema, userIdValidationSchema } from "../fieldSchemas";
import { categoryIdCustomValidationSchema, categoryNameCustomValidationSchema } from "./custom";

export const updateCategorySchema = {
  category_id: categoryIdCustomValidationSchema,
  user_id: userIdValidationSchema,
  name: categoryNameCustomValidationSchema,
  description: categoryDescriptionValidationSchema,
};

export const validateUpdateCategory = () => {
  return checkSchema(updateCategorySchema, ["body", "params"]);
};
