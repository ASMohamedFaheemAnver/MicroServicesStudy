const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());

app.post("/events", async (req, res) => {
  const { type, data } = req.body;
  if (type === "CommentCreated") {
    const status = data.content.includes("orange") ? "rejected" : "approved";
    setTimeout(async () => {
      await axios.post("http://event-srv:4005/events", {
        type: "CommentModerated",
        data: {
          ...data,
          status: status,
        },
      });
    }, 6000);
  }
  res.send({ msg: "200K OK!" });
});

app.listen(4003, () => {
  console.log("server(moderation) is listenning on port : 4003!");
});
