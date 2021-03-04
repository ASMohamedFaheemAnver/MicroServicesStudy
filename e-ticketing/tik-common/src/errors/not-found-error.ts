import { CustomError } from "./custom-error";

export class NotFountError extends CustomError {
  statusCode = 404;
  constructor() {
    super("route not found");
    Object.setPrototypeOf(this, NotFountError.prototype);
  }
  serializeErrors(): { message: string; field?: string | undefined }[] {
    return [{ message: "route not found" }];
  }
}
