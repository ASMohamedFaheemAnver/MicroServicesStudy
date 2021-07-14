import mongoose from "mongoose";
import { OrderCancelledEvent, OrderStatus } from "@coders2authority/tik-common";
import { natsWrapper } from "../../../nats-wrapper";
import { Message } from "node-nats-streaming";
import { Order } from "../../../model/order";
import { OrderCancelledListener } from "../order-cancelled-listener";

const setup = async () => {
  const listener = new OrderCancelledListener(natsWrapper.client);
  const data: OrderCancelledEvent["data"] = {
    id: mongoose.Types.ObjectId().toHexString(),
    version: 1,
    ticket: {
      id: "ticketId",
    },
  };

  const order = Order.build({
    id: data.id,
    price: 20,
    status: OrderStatus.CREATED,
    userId: "userId",
    version: 0,
  });

  await order.save();

  // @ts-ignore
  const msg: Message = {
    ack: jest.fn(),
  };

  return { listener, data, msg, order };
};

it("updates the status of the order", async () => {
  const { listener, data, msg } = await setup();
  await listener.onMessage(data, msg);

  const order = await Order.findById(data.id);

  expect(order.status).toEqual(OrderStatus.CANCELLED);
});

it("acks the message", async () => {
  const { listener, data, msg } = await setup();
  await listener.onMessage(data, msg);

  expect(msg.ack).toHaveBeenCalled();
});
