export enum ErrorMessages {
  SERVER_ERROR = "Server error",
  INVALID_INPUT = "Invalid input",
  UNAUTHORIZED = "Unauthorized",
  FORBIDDEN = "Forbidden",
  WRONG_CREDENTIALS = "Something went wrong. Please check your credentials",
  EMPTY_FIELD = "The field is empty",
  INVALID_EMAIL = "This is not a valid e-mail address",
  PASSWORD_LENGTH = "Password must be between 6 and 20 characters long",
  DUPLICATE_CATEGORY = "This category already exists for this user",
  DUPLICATE_ACTIVITY = "This activity already exists for this user",
  NO_PARAM_FOUND = "The category_id parameter was not found",
  WRONG_CATEGORY_ID = "The category_id parameter does not exist",
  WRONG_ACTIVITY_ID = "The activity_id parameter does not exist",
}

export enum ErrorTypes {
  AUTH = "Auth",
  INPUT = "Input",
}
