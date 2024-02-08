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
