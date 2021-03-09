import request from "supertest";
import mongoose from "mongoose";
import { app } from "../../app";

it("returns a 404 if the ticket is not found", async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  const res = await request(app).get(`/api/tickets/${id}`).send();
  expect(res.status).toEqual(404);
});

it("returns the ticket if found", async () => {
  const title = "concert";
  const price = 20;
  const res = await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send({ title, price })
    .expect(201);
  const res2 = await request(app)
    .get(`/api/tickets/${res.body.id}`)
    .send()
    .expect(200);

  expect(res2.body.title).toEqual(title);
  expect(res2.body.price).toEqual(price);
});
