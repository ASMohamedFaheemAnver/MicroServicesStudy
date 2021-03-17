import request from "supertest";
import { app } from "../../app";
import { Order, OrderStatus } from "../../models/order";
import { Ticket } from "../../models/ticket";

const buildTicket = async () => {
  const ticket = Ticket.build({ title: "concert", price: 20 });
  await ticket.save();
  return ticket;
};

it("fetches orders for a particular user", async () => {
  const ticket = await buildTicket();
  const ticket2 = await buildTicket();
  const ticket3 = await buildTicket();

  const cookie = global.signin();
  const cookie2 = global.signin();

  const { body: orderOne } = await request(app)
    .post("/api/orders")
    .set("Cookie", cookie)
    .send({ ticketId: ticket.id })
    .expect(201);

  const { body: orderTwo } = await request(app)
    .post("/api/orders")
    .set("Cookie", cookie2)
    .send({ ticketId: ticket2.id })
    .expect(201);

  const { body: orderThree } = await request(app)
    .post("/api/orders")
    .set("Cookie", cookie2)
    .send({ ticketId: ticket3.id })
    .expect(201);

  const res = await request(app)
    .get("/api/orders")
    .set("Cookie", cookie2)
    .expect(200);

  expect(res.body.length).toEqual(2);
  expect(res.body[0].id).toEqual(orderTwo.id);
  expect(res.body[1].id).toEqual(orderThree.id);
});
