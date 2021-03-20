import request from "supertest";
import { app } from "../../app";
import { Order, OrderStatus } from "../../models/order";
import { Ticket } from "../../models/ticket";

it("marks an order as cancelled", async () => {
  const ticket = Ticket.build({ title: "concert", price: 20 });
  await ticket.save();

  const cookie = global.signin();
  const { body: order } = await request(app)
    .post("/api/orders")
    .set("Cookie", cookie)
    .send({ ticketId: ticket.id })
    .expect(201);

  await request(app)
    .delete(`/api/orders/${order.id}`)
    .set("Cookie", cookie)
    .expect(204);

  const updatedOrder = await Order.findById(order.id);
  expect(updatedOrder.status).toEqual(OrderStatus.CANCELLED);
});

it.todo("emits a order cancelled event");
