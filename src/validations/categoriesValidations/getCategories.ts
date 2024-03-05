import { checkSchema } from "express-validator";
import { userIdValidationSchema } from "../fieldSchemas";

export const getCategoriesSchema = {
  user_id: userIdValidationSchema,
};

export const validateGetCategories = () => {
  return checkSchema(getCategoriesSchema, ["params"]);
};
