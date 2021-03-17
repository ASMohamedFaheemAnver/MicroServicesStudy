import { CustomError } from "./custom-error";

export class NotFountError extends CustomError {
  statusCode = 404;
  constructor(message: string = "not found") {
    super(message);
    Object.setPrototypeOf(this, NotFountError.prototype);
  }
  serializeErrors(): { message: string; field?: string | undefined }[] {
    return [{ message: this.message }];
  }
}
