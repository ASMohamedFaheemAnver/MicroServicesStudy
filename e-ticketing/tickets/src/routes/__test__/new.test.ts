import request from "supertest";
import { app } from "../../app";

it("has a route handler to /api/tickets for post requests", async () => {
  const res = await request(app).post("/api/tickets").send({});
  expect(res.status).not.toEqual(404);
});

it("can only be accessed if the user is signed in", async () => {
  const res = await request(app).post("/api/tickets").send({});
  expect(res.status).toEqual(401);
});

it("returns a status other than 401 is the user is signed in", async () => {
  const res = await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send({});
  expect(res.status).not.toEqual(401);
});

it("returns an error if an invalid title is provided", async () => {
  const res = await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send({ title: "", price: 10 });
  expect(res.status).toEqual(400);

  const res2 = await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send({ price: 10 });
  expect(res2.status).toEqual(400);
});

it("returns an error if an invalid price is provided", async () => {});

it("creates a ticket with vavlid inputs", async () => {});
