import express, { NextFunction, Request, Response } from "express";
import { body } from "express-validator";
import jwt from "jsonwebtoken";

import { BadRequestError } from "../errors/bad-request-error";
import { validateRequest } from "../middlewares/validate-request";

import { User } from "../models/user";
import { Password } from "../services/password";

const router = express.Router();

router.post(
  "/api/users/signin",
  [
    body("email").isEmail().withMessage("email must be valid"),
    body("password")
      .trim()
      .notEmpty()
      .withMessage("you must supply a password"),
  ],
  validateRequest,
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      throw new BadRequestError("invalid credentials");
    }

    const passwordsMatch = await Password.compare(
      existingUser.password,
      password
    );

    if (!passwordsMatch) {
      throw new BadRequestError("invalid credentials");
    }

    const userJwt = jwt.sign(
      { _id: existingUser._id, email: existingUser.email },
      process.env.JWT_KEY!
    );
    req.session = { jwt: userJwt };
    res.status(201).json({ msg: "user authenticated", user: existingUser });
  }
);

export { router as signinRouter };
