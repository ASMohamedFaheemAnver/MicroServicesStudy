import { NextFunction, Request, Response } from "express";
import { CustomError } from "../errors/custom-error";
export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let errors;
  let statusCode = 500;
  if (err instanceof CustomError) {
    errors = err.serializeErrors();
    statusCode = err.statusCode;
  } else {
    console.error(err);
    errors = [{ message: "something went wrong" }];
  }
  return res.status(statusCode).json({ errors });
};
