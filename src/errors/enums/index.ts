export enum ErrorMessages {
  SERVER_ERROR = "Server error",
  INVALID_INPUT = "Invalid input",
  UNAUTHORIZED = "Unauthorized",
  FORBIDDEN = "Forbidden",
  WRONG_CREDENTIALS = "Something went wrong. Please check your credentials",
  EMPTY_FIELD = "The field is empty",
  INVALID_EMAIL = "This is not a valid e-mail address",
  PASSWORD_LENGTH = "Password must be between 6 and 20 characters long",
}

export enum ErrorTypes {
  AUTH = "Auth",
  INPUT = "Input",
}
