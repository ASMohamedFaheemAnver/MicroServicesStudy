import {
  Listener,
  NotFountError,
  OrderCancelledEvent,
  OrderStatus,
  Subjects,
} from "@coders2authority/tik-common";
import { Message } from "node-nats-streaming";
import { Order } from "../../model/order";
import { queueGroupName } from "./queue-group-name";

export class OrderCancelledListener extends Listener<OrderCancelledEvent> {
  subject: Subjects.ORDER_CANCELLED = Subjects.ORDER_CANCELLED;
  queueGroupName: string = queueGroupName;
  async onMessage(
    data: { id: string; version: number; ticket: { id: string } },
    msg: Message
  ) {
    const order = await Order.findOne({
      _id: data.id,
      version: data.version - 1,
    });

    if (!order) {
      throw new NotFountError("Order not found");
    }

    order.set({ status: OrderStatus.CANCELLED });
    await order.save();

    msg.ack();
  }
}
