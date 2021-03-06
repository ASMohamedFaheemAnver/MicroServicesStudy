import mongoose from "mongoose";
import { app } from "./app";

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error("jwt_key must be defined");
  }
  if (!process.env.MONGO_URI) {
    throw new Error("mongo_uri must be defined");
  }
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    app.listen(3000, () => {
      console.log("server listening on port 3000!");
    });
  } catch (err) {
    console.error(err);
  }
};

start();
