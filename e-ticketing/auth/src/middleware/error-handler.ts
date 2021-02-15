import { NextFunction, Request, Response } from "express";
import { DatabaseConnectionError } from "../errors/database-connection-error";
import { RequestValidationError } from "../errors/request-validation-error";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let status = 500;
  let errors: { message: string; field?: string }[] = [];
  if (err instanceof RequestValidationError) {
    status = 400;
    errors = err.errors.map((error) => {
      return { message: error.msg, field: error.param };
    });
  } else if (err instanceof DatabaseConnectionError) {
    errors.push({ message: err.reason });
  } else {
    errors.push({ message: "something went wrong" });
  }
  res.status(status).json({ errors });
};
