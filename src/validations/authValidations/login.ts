import { checkSchema } from "express-validator";
import { emailValidationSchema, passwordValidationSchema } from "../fieldSchemas";

export const loginSchema = {
  email: emailValidationSchema,
  password: passwordValidationSchema,
};

export const validateLogin = () => {
  return checkSchema(loginSchema, ["body"]);
};
