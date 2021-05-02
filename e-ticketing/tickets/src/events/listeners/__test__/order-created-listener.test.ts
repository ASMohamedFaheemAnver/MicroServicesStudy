import mongoose from "mongoose";
import { OrderCreatedEvent, OrderStatus } from "@coders2authority/tik-common";
import { Message } from "node-nats-streaming";
import { Ticket } from "../../../model/ticket";
import { natsWrapper } from "../../../nats-wrapper";
import { OrderCreatedListener } from "../order-created-listener";

const setup = async () => {
  const Listener = new OrderCreatedListener(natsWrapper.client);

  const ticket = Ticket.build({
    title: "concert",
    price: 99,
    userId: "randomUserId",
  });

  await ticket.save();

  const data: OrderCreatedEvent["data"] = {
    id: mongoose.Types.ObjectId().toHexString(),
    version: 0,
    status: OrderStatus.CREATED,
    userId: "randomUserId",
    expiresAt: "randomTime",
    ticket: {
      id: ticket.id,
      price: ticket.price,
    },
  };

  // @ts-ignore
  const msg: Message = {
    ack: jest.fn(),
  };

  return { Listener, ticket, data, msg };
};

it("sets the userId of the ticket", async () => {
  const { Listener, ticket, data, msg } = await setup();
  await Listener.onMessage(data, msg);
  const updatedTicket = await Ticket.findById(ticket.id);
  expect(updatedTicket!.orderId).toEqual(data.id);
});

it("acks the message", async () => {
  const { Listener, ticket, data, msg } = await setup();
  await Listener.onMessage(data, msg);
  expect(msg.ack).toHaveBeenCalled();
});
