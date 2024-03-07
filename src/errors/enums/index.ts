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
  NO_PARAM_FOUND = "No parameter was provided",
  WRONG_CATEGORY_ID = "The category_id parameter does not exist",
  WRONG_BODY_CATEGORY_ID = "The category_id body parameter does not exist",
  WRONG_ACTIVITY_ID = "The activity_id parameter does not exist",
  WRONG_STATUS = "The status value should be one of: TO_DO, IN_PROGRESS, ON_HOLD, COMPLETED or CANCELLED",
  WRONG_PRIORITY = "The priority value should be one of: LOW, MEDIUM, HIGH or URGENT",
  NOT_A_NUMBER = "The provided value is not a number",
}

export enum ErrorTypes {
  AUTH = "Auth",
  INPUT = "Input",
}
