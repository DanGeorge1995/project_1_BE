import express from "express";
import router from "./router";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";
import { protect } from "./modules/auth";
import { loginUser, registerUser, getUsers } from "./handlers/user";
import { handleRefreshToken } from "./handlers/refreshToken";

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.json({ message: "hello" });
});

app.use("/api", protect, router);

app.post("/register", registerUser);
app.post("/login", loginUser);
app.get("/refresh", handleRefreshToken);

app.get("/users", getUsers);

app.use((err, req, res, next) => {
  if (err.type === "auth") {
    res.status(401).json({ message: "unauthorized" });
  } else if (err.type === "input") {
    res.status(400).json({ message: "invalid input" });
  } else {
    res.status(500).json({ message: "oops, that's on us" });
  }
});

export default app;
