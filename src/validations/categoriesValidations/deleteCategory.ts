import { checkSchema } from "express-validator";
import { userIdValidationSchema } from "../fieldSchemas";
import { categoryIdCustomValidationSchema } from "./custom";

export const deleteCategorySchema = {
  category_id: categoryIdCustomValidationSchema,
  user_id: userIdValidationSchema,
};

export const validateDeleteCategory = () => {
  return checkSchema(deleteCategorySchema, ["params", "body"]);
};
