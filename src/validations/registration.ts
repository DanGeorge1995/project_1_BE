import { checkSchema } from "express-validator";
import { emailValidationSchema, passwordValidationSchema, usernameValidationSchema } from "./fieldSchemas";

export const registrationSchema = {
  email: emailValidationSchema,
  username: usernameValidationSchema,
  password: passwordValidationSchema,
};

export const validateRegistration = () => {
  return checkSchema(registrationSchema, ["body"]);
};
