import jwt from "jsonwebtoken";
import { createJWT } from "../modules/auth";
import { findUserByRefreshToken } from "../db/queries/auth";
import config from "../config";
import { handleForbiddenResponse, handleUnauthorizedResponse } from "../errors/responses";

export const handleRefreshToken = async (req, res, next) => {
  try {
    const cookiesRefreshToken = req.cookies?.refresh_token;
    if (!cookiesRefreshToken) {
      return handleUnauthorizedResponse(res);
    }

    const user = await findUserByRefreshToken(cookiesRefreshToken);

    if (!user) {
      return handleForbiddenResponse(res);
    }

    jwt.verify(cookiesRefreshToken, config.refreshTokenSecret, (err, decoded) => {
      if (err || user.email !== decoded.email) {
        return handleForbiddenResponse(res);
      }
      const accessToken = createJWT(decoded, config.accessTokenSecret, config.accessTokenExpiration);
      res.status(200).json({ accessToken });
    });
  } catch (err) {
    next(err);
  }
};
