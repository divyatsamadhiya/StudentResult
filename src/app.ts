import express from "express";
import authRouter from "./routes/authRoutes.js";
import studentRouter from "./routes/studentRoutes.js";
import requestLogger from "./middlewares/requestLogger.js";

export const createApp = () => {
  const app = express();

  app.use(express.json());
  app.use(requestLogger);
  app.use("/api/v1/auth", authRouter);
  app.use("/api/v1", studentRouter);

  return app;
};
