import {
  Listener,
  NotFountError,
  OrderStatus,
  PaymentCreatedEvent,
  Subjects,
} from "@coders2authority/tik-common";
import { Message } from "node-nats-streaming";
import { Order } from "../../models/order";
import { queueGroupName } from "./queue-group-name";

export class PaymentCreatedListener extends Listener<PaymentCreatedEvent> {
  subject: Subjects.PAYMENT_CREATED = Subjects.PAYMENT_CREATED;
  queueGroupName: string = queueGroupName;
  async onMessage(
    data: { id: string; orderId: string; stripeId: string },
    msg: Message
  ) {
    const order = await Order.findById(data.orderId);

    if (!order) {
      throw new NotFountError("Order not found");
    }

    order.set({ status: OrderStatus.COMPLETE });
    await order.save();
    // Need to publishe an event that says order updated

    msg.ack();
  }
}
