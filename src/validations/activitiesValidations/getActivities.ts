import { checkSchema } from "express-validator";
import { userIdValidationSchema } from "../fieldSchemas";
import { categoryIdCustomValidationSchema } from "./custom";

export const getActivitiesSchema = {
  user_id: userIdValidationSchema,
  category_id: categoryIdCustomValidationSchema,
};

export const validateGetActivities = () => {
  return checkSchema(getActivitiesSchema, ["body", "params"]);
};
