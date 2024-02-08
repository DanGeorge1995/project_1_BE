import express from "express";
import router from "./router";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";
import { protect } from "./modules/auth";
import { loginUser, registerUser, getUsers, logoutUser } from "./handlers/user";
import { handleRefreshToken } from "./handlers/refreshToken";
import { ErrorTypes } from "./errors/enums";
import { handleInvalidInputResponse, handleServerErrorResponse, handleUnauthorizedResponse } from "./errors/responses";
import { validateRegistration, validateLogin } from "./validations";
import { handleInputErrors } from "./modules/middleware";

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Test routes
app.get("/", (req, res) => {
  res.json({ message: "hello" });
});
app.get("/users", getUsers);

// Protected routes
app.use("/api", protect, router);

// Auth routes
app.post("/register", validateRegistration(), handleInputErrors, registerUser);
app.post("/login", validateLogin(), handleInputErrors, loginUser);
app.post("/logout", protect, logoutUser);
app.post("/refresh", handleRefreshToken);

app.use((err, req, res, next) => {
  if (err.type === ErrorTypes.AUTH) {
    handleUnauthorizedResponse(res);
  } else if (err.type === ErrorTypes.INPUT) {
    handleInvalidInputResponse(res);
  } else {
    handleServerErrorResponse(res);
  }
});

export default app;
