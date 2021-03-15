import nats, { Message } from "node-nats-streaming";
import { randomBytes } from "crypto";

const stan = nats.connect("ticketing", randomBytes(4).toString("hex"), {
  url: "http://localhost:4222",
});

stan.on("connect", () => {
  console.log("Listener connected to NATS");

  const options = stan
    .subscriptionOptions()
    .setManualAckMode(true)
    .setDeliverAllAvailable()
    .setDurableName("account-service");

  const subscription = stan.subscribe(
    "ticket:created",
    "orders-service-queue-group",
    options
  );
  subscription.on("message", (msg: Message) => {
    stan.on("close", () => {
      console.log("NATS connection closed");
      process.exit();
    });

    const data = msg.getData();
    if (typeof data == "string") {
      console.log(
        `Received event #${msg.getSequence()}, with data: ${JSON.stringify(
          JSON.parse(data)
        )}`
      );
    }
    msg.ack();
  });
});

process.on("SIGINT", () => {
  stan.close();
});

process.on("SIGTERM", () => {
  stan.close();
});
