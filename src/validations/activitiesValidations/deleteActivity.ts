import { checkSchema } from "express-validator";
import { userIdValidationSchema } from "../fieldSchemas";
import { activityIdCustomValidationSchema, categoryIdCustomValidationSchema } from "./custom";

export const deleteActivitySchema = {
  category_id: categoryIdCustomValidationSchema,
  activity_id: activityIdCustomValidationSchema,
  user_id: userIdValidationSchema,
};

export const validateDeleteActivity = () => {
  return checkSchema(deleteActivitySchema, ["params", "body"]);
};
