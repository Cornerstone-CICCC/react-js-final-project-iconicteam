import { NextFunction, Request, Response } from "express";
import { verifyAccessToken } from "../services/jwt.service";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authorizationHeader = req.headers.authorization;
  if (!authorizationHeader) {
    res.status(401).json({ message: "Access token is required" });
    return;
  }
  if (!authorizationHeader.startsWith("Bearer ")) {
    res.status(401).json({ message: "Invalid authorization header format" });
    return;
  }

  const accessToken = authorizationHeader.split(" ")[1];
  if (!accessToken) {
    res.status(401).json({ message: "Access token is required" });
    return;
  }
  try {
    const payload = verifyAccessToken(accessToken);
    if (typeof payload === "string" || !payload.sub) {
      res.status(401).json({ message: "Invalid access token payload" });
      return;
    }
    const id = Number(payload.sub);
    if (!Number.isInteger(id) || id <= 0) {
      res.status(401).json({ message: "Invalid user id" });
      return;
    }
    req.userId = id;
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: "Invalid or expired access token" });
  }
};
