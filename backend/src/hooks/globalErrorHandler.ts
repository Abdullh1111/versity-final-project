import { NextFunction, Request, Response } from "express";
import { AppError } from "./AppError";

/* eslint-disable @typescript-eslint/no-unused-vars */
export async function globalErrorHandler(
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const message = err.message || "Internal Server Error";
  const status = err.status || 500;
  console.log(err);

  res.status(status).send({
    success: false,
    message,
    error: err,
  });
}
