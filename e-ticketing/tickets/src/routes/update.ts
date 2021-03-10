import {
  NotAuthorizedError,
  NotFountError,
  requireAuth,
  validateRequest,
} from "@coders2authority/tik-common";
import express, { Request, Response } from "express";
import { body } from "express-validator";
import { Ticket } from "../model/ticket";

const router = express.Router();

router.put(
  "/api/tickets/:id",
  requireAuth,
  [
    body("title").not().isEmpty().withMessage("title is required"),
    body("price")
      .isFloat({ gt: 0 })
      .withMessage("price must be provided and must be greater than 0"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const ticket = await Ticket.findById(req.params.id);

    if (!ticket) {
      throw new NotFountError();
    } else if (ticket.userId !== req.currentUser!.id) {
      throw new NotAuthorizedError();
    }

    ticket.set({
      title: req.body.title,
      price: req.body.price,
    });
    await ticket.save();
    return res.send(ticket);
  }
);

export { router as updateTicketRouter };
