import { checkSchema } from "express-validator";
import { descriptionValidationSchema, userIdValidationSchema } from "../fieldSchemas";
import { activityIdCustomValidationSchema, activityNameCustomValidationSchema, categoryIdCustomValidationSchema, estimatedExpensesCustomValidationSchema, priorityCustomValidationSchema, statusCustomValidationSchema } from "./custom";

export const updateActivitySchema = {
  activity_id: activityIdCustomValidationSchema,
  category_id: categoryIdCustomValidationSchema,
  user_id: userIdValidationSchema,
  name: activityNameCustomValidationSchema,
  description: descriptionValidationSchema,
  status: statusCustomValidationSchema,
  priority: priorityCustomValidationSchema,
  estimated_expenses: estimatedExpensesCustomValidationSchema,
};

export const validateUpdateActivity = () => {
  return checkSchema(updateActivitySchema, ["body", "params"]);
};
