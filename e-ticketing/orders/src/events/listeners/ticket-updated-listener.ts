import {
  Listener,
  NotFountError,
  Subjects,
  TicketUpdatedEvent,
} from "@coders2authority/tik-common";
import { Message } from "node-nats-streaming";
import { Ticket } from "../../models/ticket";
import { queueGroupName } from "./queue-group-name";

export class TicketUpdatedListener extends Listener<TicketUpdatedEvent> {
  subject: Subjects.TICKER_UPDATED = Subjects.TICKER_UPDATED;
  queueGroupName: string = queueGroupName;
  async onMessage(data: TicketUpdatedEvent["data"], msg: Message) {
    const ticket = await Ticket.findByEvent(data);
    if (!ticket) {
      throw new NotFountError("ticket not found");
    }
    const { title, price } = data;
    ticket.set({ title, price });
    await ticket.save();
    msg.ack();
  }
}
