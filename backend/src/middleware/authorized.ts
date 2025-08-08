import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import config from "../config";

export interface CustomRequest extends Request {
  user?: any;
}

export const authorized = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  let token;
  if (authHeader && authHeader.startsWith("Bearer ")) {
     token = authHeader.split(" ")[1]; // Get the token after "Bearer"
    console.log("Token:", token);
  } else {
    console.log("No valid bearer token found");
  }

  if (!token) {
    const error = new Error("Token not found");
    next(error);
  }
  const tokenSecret = config.JWT_SECRET;

  try {
    const payload = jwt.verify(token as string, tokenSecret);
    // console.log(payload);
    req.user = payload;
    next();
  } catch (err) {
    const error = new Error("Token not valid");
    next(error);
  }
};
