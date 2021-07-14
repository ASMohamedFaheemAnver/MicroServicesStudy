import request from "supertest";
import mongoose from "mongoose";
import { app } from "../../app";

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
it("returns a 401 when purchasing an order that doesn't belong to the user", async () => {});
it("returns a 400 when purchasing a cancelled order", async () => {});
