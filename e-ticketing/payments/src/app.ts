import express from "express";
import { json } from "body-parser";
import "express-async-errors";
import cookieSession from "cookie-session";
import { currentUser, errorHandler } from "@coders2authority/tik-common";
import { NotFountError } from "@coders2authority/tik-common";
import { createChargeRouter } from "./routes/new";

const app = express();
app.set("trust proxy", true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== "test",
  })
);

app.use(currentUser);
app.use(createChargeRouter);

app.use(async (req, res, next) => {
  throw new NotFountError("route not found");
});
app.use(errorHandler);

export { app };
