import prisma from "../db";
import jwt from "jsonwebtoken";
import { createJWT } from "../modules/auth";

export const handleRefreshToken = async (req, res, next) => {
  try {
    const cookies = req.cookies;
    if (!cookies?.refresh_token) {
      return res.status(401).json({ message: "not authorized" });
    }
    console.log(cookies.refresh_token);
    const refreshToken = cookies.refresh_token;

    const user = await prisma.user.findUnique({
      where: {
        refresh_token: refreshToken,
      },
    });
    if (!user) {
      res.status(403).json({ message: "forbidden" });
    }
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
      console.log({ err, user, decoded });
      if (err || user.email !== decoded.email) {
        return res.status(403).json({ message: "forbidden" });
      }
      const accessToken = createJWT(decoded, process.env.ACCESS_TOKEN_SECRET, "30s");
      res.json({ accessToken });
    });
  } catch (err) {
    next(err);
  }
};
