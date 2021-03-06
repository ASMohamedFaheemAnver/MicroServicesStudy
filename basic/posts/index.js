const express = require("express");
const { randomBytes } = require("crypto");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");

const app = express();

app.use(cors());
app.use(bodyParser.json());

const posts = {};

app.get("/posts", (req, res) => {
  res.send(posts);
});

app.post("/posts/create", async (req, res) => {
  const id = randomBytes(4).toString("hex");
  const { title } = req.body;
  posts[id] = { id, title };

  // notifying all services by emitting it into message broker
  await axios.post("http://event-srv:4005/events", { type: "PostCreated", data: { id, title } });

  res.status(201).send(posts[id]);
});

app.post("/events", (req, res) => {
  console.log({ event: req.body });
  res.send({ msg: "200K OK!" });
});

app.listen(4000, () => {
  console.log("docker server(posts) is listenning on port : 4000!");
});
