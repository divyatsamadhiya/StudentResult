import express from "express";
import connectDB from "./configs/db.js";
import studentRouter from "./routes/studentRoutes.js";
import "./configs/env.js";

export const createApp = () => {
  const app = express();

  app.use(express.json());
  app.use("/api/v1", studentRouter);

  return app;
};

export const startServer = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is not defined");
    }

    await connectDB(process.env.MONGO_URI);
    console.log("Connected to database...");
    const app = createApp();
    const port = process.env.PORT ? Number(process.env.PORT) : 3000;
    app.listen(port, () => {
      console.log("Server is listening on port: " + port);
    });
  } catch (error) {
    console.log(error);
  }
};

if (process.env.NODE_ENV !== "test") {
  startServer();
}
