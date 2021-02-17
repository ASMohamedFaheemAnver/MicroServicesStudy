import express from "express";
import { json } from "body-parser";
import "express-async-errors";

import { currentUserRouter } from "./routes/current-user";
import { signinRouter } from "./routes/signin";
import { signoutRouter } from "./routes/signout";
import { signupRouter } from "./routes/signup";
import { errorHandler } from "./middleware/error-handler";
import { NotFountError } from "./errors/not-found-error";

const app = express();
app.use(json());

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);
app.use(async (req, res, next) => {
  throw new NotFountError();
});
app.use(errorHandler);

app.listen(3000, () => {
  console.log("server listening on port 3000!");
});
