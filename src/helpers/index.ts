export const userWithoutRefreshToken = {
  id: true,
  created_at: true,
  updated_at: true,
  email: true,
  username: true,
  password: true,
  date_of_birth: true,
  gender: true,
  country: true,
  phone_number: true,
  refresh_token: false,
};

export const refreshTokenCookieOptions = {
  httpOnly: true,
  maxAge: 24 * 60 * 60 * 1000,
};

export enum Cookies {
  REFRESH_TOKEN = "refresh_token",
}

export enum SuccessMessages {
  LOGOUT = "Logout successfully",
}

export enum Statuses {
  TO_DO = "TO_DO",
  IN_PROGRESS = "IN_PROGRESS",
  ON_HOLD = "ON_HOLD",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
}

export enum Priorities {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
  URGENT = "URGENT",
}

export const statusesArray = [Statuses.TO_DO, Statuses.IN_PROGRESS, Statuses.ON_HOLD, Statuses.COMPLETED, Statuses.CANCELLED];

export const prioritiesArray = [Priorities.LOW, Priorities.MEDIUM, Priorities.HIGH, Priorities.URGENT];
