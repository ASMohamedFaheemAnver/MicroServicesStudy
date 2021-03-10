import { NotFountError } from "@coders2authority/tik-common";
import express, { Request, Response } from "express";

import { Ticket } from "../model/ticket";

const router = express.Router();

router.get("/api/tickets/:id", async (req: Request, res: Response) => {
  const ticket = await Ticket.findById(req.params.id);
  if (!ticket) {
    throw new NotFountError();
  }
  return res.send(ticket);
});

export { router as showTicketRouter };
