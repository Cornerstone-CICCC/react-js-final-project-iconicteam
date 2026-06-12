import { Router } from "express";
import userController from "../controllers/user.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const userRouter = Router();

userRouter.get("/me", authMiddleware, userController.getCurrentUser);
userRouter.get("/:id", authMiddleware, userController.getUserById);
userRouter.post("/signup", userController.addUser);
userRouter.post("/login", userController.login);
userRouter.post("/refresh", userController.restoreAccessToken);
userRouter.post("/logout", userController.logout);

export default userRouter;
