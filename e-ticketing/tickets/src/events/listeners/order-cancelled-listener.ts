import {
  Listener,
  NotFountError,
  OrderCancelledEvent,
  Subjects,
} from "@coders2authority/tik-common";
import { Message } from "node-nats-streaming";
import { Ticket } from "../../model/ticket";
import { TicketUpdatedPublisher } from "../publishers/ticket-updated-publisher";
import { queueGroupName } from "./queue-group-name";

export class OrderCancelledListener extends Listener<OrderCancelledEvent> {
  subject: Subjects.ORDER_CANCELLED = Subjects.ORDER_CANCELLED;
  queueGroupName: string = queueGroupName;
  async onMessage(
    data: { id: string; version: number; ticket: { id: string } },
    msg: Message
  ) {
    const ticket = await Ticket.findById(data.ticket.id);
    if (!ticket) {
      throw new NotFountError("ticket not found");
    }
    ticket.set({ orderId: undefined });
    await ticket.save();

    await new TicketUpdatedPublisher(this.client).publish({
      id: ticket.id,
      price: ticket.price,
      title: ticket.title,
      userId: ticket.userId,
      version: ticket.version,
      orderId: ticket.orderId,
    });
    msg.ack();
  }
}
