import {
  Listener,
  ExpirationCompleteEvent,
  Subjects,
  NotFountError,
  OrderStatus,
} from "@coders2authority/tik-common";
import { Message } from "node-nats-streaming";
import { Order } from "../../models/order";
import { OrderCancelledPublisher } from "../publishers/order-cancelled-publisher";
import { queueGroupName } from "./queue-group-name";

export class ExpirationCompleteListener extends Listener<ExpirationCompleteEvent> {
  subject: Subjects.EXPIRATION_COMPLETE = Subjects.EXPIRATION_COMPLETE;
  queueGroupName: string = queueGroupName;
  async onMessage(data: { orderId: string }, msg: Message) {
    const order = await Order.findById(data.orderId);
    if (!order) {
      new NotFountError("Order not found");
    }

    if (order.status === OrderStatus.COMPLETE) {
      return msg.ack();
    }

    order.set({ status: OrderStatus.CANCELLED });
    await order.save();

    await new OrderCancelledPublisher(this.client).publish({
      id: order.id,
      ticket: { id: order.ticket },
      version: order.version,
    });

    msg.ack();
  }
}
