import request from "supertest";
import mongoose from "mongoose";
import { app } from "../../app";
import { Order, OrderStatus } from "../../model/order";

it("returns a 404 when purchasing an order that doen't exist", async () => {
  const res = await request(app)
    .post("/api/payments")
    .send({
      token: "token",
      orderId: mongoose.Types.ObjectId().toHexString(),
    })
    .set("Cookie", globalThis.signin());

  expect(res.status).toEqual(404);
});

it("returns a 401 when purchasing an order that doesn't belong to the user", async () => {
  const order = Order.build({
    id: mongoose.Types.ObjectId().toHexString(),
    version: 0,
    userId: mongoose.Types.ObjectId().toHexString(),
    price: 20,
    status: OrderStatus.CREATED,
  });

  await order.save();

  const res = await request(app)
    .post("/api/payments")
    .send({
      token: "token",
      orderId: order.id,
    })
    .set("Cookie", globalThis.signin());

  expect(res.status).toEqual(401);
});

it("returns a 400 when purchasing a cancelled order", async () => {
  const order = Order.build({
    id: mongoose.Types.ObjectId().toHexString(),
    version: 0,
    userId: mongoose.Types.ObjectId().toHexString(),
    price: 20,
    status: OrderStatus.CANCELLED,
  });

  await order.save();

  const res = await request(app)
    .post("/api/payments")
    .send({
      token: "token",
      orderId: order.id,
    })
    .set("Cookie", globalThis.signin(order.userId));

  expect(res.status).toEqual(400);
});
