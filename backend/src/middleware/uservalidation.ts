import { NextFunction, Request, Response } from "express";
import { signInValidationSchema, signupValidationSchema } from "../modules/user/user.validation";

export const signupValidation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(req.body);
  try {
    const validatedData =signupValidationSchema.parse(req.body);
    req.body = {...validatedData, ...req.body};
    next();
  } catch (error) {
    next(error);
  }
};
export const signInValidation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const validatedData = signInValidationSchema.parse(req.body);
    req.body = validatedData;
    next();
  } catch (error) {
    // console.log("hello");
    next(error);
  }
};
