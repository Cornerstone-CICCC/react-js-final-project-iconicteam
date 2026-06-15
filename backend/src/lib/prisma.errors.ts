import { Response } from "express";
import { Prisma } from "@prisma/client";

export const handlePrismaUserError = (error: unknown, res: Response) => {
  if (!(error instanceof Prisma.PrismaClientKnownRequestError)) {
    return false;
  }
  if (error.code === "P2002") {
    res.status(409).json({ message: "User exists already" });
    return true;
  }
  if (error.code === "P2025") {
    res.status(404).json({ message: "User was not found" });
    return true;
  }
  return false;
};
