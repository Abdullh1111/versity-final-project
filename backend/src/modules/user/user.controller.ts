import { Request, Response } from "express";
import { catchAsync } from "../../hooks/catchAsync";
import { userService } from "./user.service";
import { CustomRequest } from "../../middleware/authorized";

const createUser = catchAsync(async (req: Request, res: Response) => {
  const result = await userService.createUser(req.body);

  res.send({
    success: true,
    message: "User created successfully",
    data: result,
  });
});

const signInUser = catchAsync(async (req: Request, res: Response) => {
  const {token, userExist} = await userService.signInUser(req.body);

  res.send({
    accessToken: token,
    success: true,
    message: "User signed in successfully",
    user: userExist,
  });
});

const logoutUser = catchAsync(async (req: Request, res: Response) => {
  res.clearCookie("accessToken").send({
    success: true,
    message: "User logged out successfully",
  });
});

const userData = catchAsync(async (req: CustomRequest, res: Response) => {
  // console.log(req.user);
  const result = await userService.userData(req.user.email);
  res.send({
    success: true,
    message: "User data fetched successfully",
    data: result,
  });
});

export const userController = {
  createUser,
  signInUser,
  logoutUser,
  userData
};
