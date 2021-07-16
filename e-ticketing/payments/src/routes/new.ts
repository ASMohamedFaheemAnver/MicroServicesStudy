import {
  BadRequestError,
  NotAuthorizedError,
  NotFountError,
  OrderStatus,
  requireAuth,
  validateRequest,
} from "@coders2authority/tik-common";
import express, { Request, Response } from "express";
import { body } from "express-validator";
import { Order } from "../model/order";
import { stripe } from "../stripe";

const router = express.Router();

router.post(
  "/api/payments",
  requireAuth,
  [body("token").not().isEmpty(), body("orderId").not().isEmpty()],
  validateRequest,
  async (req: Request, res: Response) => {
    const { token, orderId } = req.body;
    const order = await Order.findById(orderId);

    if (!order) {
      throw new NotFountError("Order not found");
    }
    if (order.userId !== req.currentUser!.id) {
      throw new NotAuthorizedError();
    }

    if (order.status === OrderStatus.CANCELLED) {
      throw new BadRequestError("Cannot pay for a cancelled order");
    }

    await stripe.charges.create({
      description: order.status,
      currency: "usd",
      amount: order.price * 100,
      source: token,
    });

    res.send({ status: true });
  }
);

export { router as createChargeRouter };
