import { Router } from "express";
import { userController } from "./user.controller";
import {
  signInValidation,
  signupValidation,
} from "../../middleware/uservalidation";
import { authorized } from "../../middleware/authorized";

const userRouter = Router();

userRouter.post("/register", signupValidation, userController.createUser);
userRouter.post("/login", signInValidation, userController.signInUser);
userRouter.post("/logout", userController.logoutUser);
userRouter.get("/user",authorized, userController.userData);

export default userRouter;
