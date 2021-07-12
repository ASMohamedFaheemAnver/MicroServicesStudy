import Queue from "bull";
import { orderExpirationQueueName } from "./constants";

interface Payload {
  orderId: string;
}

const expirationQueue = new Queue<Payload>(orderExpirationQueueName, {
  redis: {
    host: process.env.REDIS_HOST,
  },
});

expirationQueue.process(async (job) => {
  console.log("will publish an expiration:complete event", job.data);
});

export { expirationQueue };
