import {
  NotAuthorizedError,
  NotFountError,
  requireAuth,
} from "@coders2authority/tik-common";
import express, { Request, Response } from "express";
import { OrderCancelledPublisher } from "../events/publishers/order-cancelled-publisher";
import { Order, OrderStatus } from "../models/order";
import { natsWrapper } from "../nats-wrapper";

const router = express.Router();

router.delete(
  "/api/orders/:orderId",
  requireAuth,
  async (req: Request, res: Response) => {
    const { orderId } = req.params;
    const order = await Order.findById(orderId);

    if (!order) {
      throw new NotFountError();
    }

    if (order.userId !== req.currentUser!.id) {
      throw new NotAuthorizedError();
    }

    order.status = OrderStatus.CANCELLED;
    await order.save();

    new OrderCancelledPublisher(natsWrapper.client).publish({
      id: order.id,
      ticket: {
        id: order.ticket.id,
      },
    });

    return res.status(204).send(order);
  }
);

export { router as deleteOrderRouter };
