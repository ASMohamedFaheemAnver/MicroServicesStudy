import express, { Request, Response } from "express";
import { body } from "express-validator";
import jwt from "jsonwebtoken";

import { BadRequestError } from "@coders2authority/tik-common";
import { validateRequest } from "@coders2authority/tik-common";

import { User } from "../models/user";

const router = express.Router();

router.post(
  "/api/users/signup",
  [
    body("email").isEmail().withMessage("email must be valid"),
    body("password")
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage("password must be between 4 and 20 characters"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new BadRequestError("email already in use");
    }

    const user = User.build({ email, password });
    await user.save();

    const userJwt = jwt.sign(
      { _id: user._id, email: user.email },
      process.env.JWT_KEY!
    );

    req.session = { jwt: userJwt };
    res.status(201).json({ msg: "user was created", user: user });
  }
);

export { router as signupRouter };
