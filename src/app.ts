import express from "express";
import connectDB from "./configs/db.js";
import logger from "./configs/logger.js";
import authRouter from "./routes/authRoutes.js";
import studentRouter from "./routes/studentRoutes.js";
import "./configs/env.js";
import requestLogger from "./middlewares/requestLogger.js";

export const createApp = () => {
  const app = express();

  app.use(express.json());
  app.use(requestLogger);
  app.use("/api/v1/auth", authRouter);
  app.use("/api/v1", studentRouter);

  return app;
};

export const startServer = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is not defined");
    }

    await connectDB(process.env.MONGO_URI);
    logger.info("Connected to database...");
    const app = createApp();
    const port = process.env.PORT ? Number(process.env.PORT) : 3000;
    app.listen(port, () => {
      logger.info(`Server is listening on port: ${port}`);
    });
  } catch (error) {
    logger.error(error);
  }
};

if (process.env.NODE_ENV !== "test") {
  startServer();
}
