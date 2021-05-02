import {
  Listener,
  NotFountError,
  OrderCreatedEvent,
  OrderStatus,
  Subjects,
} from "@coders2authority/tik-common";
import { Message } from "node-nats-streaming";
import { Ticket } from "../../model/ticket";
import { queueGroupName } from "./queue-group-name";

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
  subject: Subjects.ORDER_CREATED = Subjects.ORDER_CREATED;
  queueGroupName: string = queueGroupName;
  async onMessage(
    data: {
      id: string;
      version: number;
      status: OrderStatus;
      userId: string;
      expiresAt: string;
      ticket: { id: string; price: number };
    },
    msg: Message
  ) {
    const ticket = await Ticket.findById(data.ticket.id);
    if (!ticket) {
      throw new NotFountError("ticket not found");
    }
    ticket.set({ orderId: data.id });
    await ticket.save();
    msg.ack();
  }
}
