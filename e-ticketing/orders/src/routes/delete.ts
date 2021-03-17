import {
  NotAuthorizedError,
  NotFountError,
  requireAuth,
} from "@coders2authority/tik-common";
import express, { Request, Response } from "express";
import { Order, OrderStatus } from "../models/order";

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

    res.send({});
  }
);

export { router as deleteOrderRouter };
