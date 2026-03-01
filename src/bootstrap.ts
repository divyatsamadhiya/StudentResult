import "./configs/env.js";
import mongoose from "mongoose";
import connectDB from "./configs/db.js";
import logger from "./configs/logger.js";
import { createApp } from "./app.js";

let server: import("http").Server | null = null;
let shuttingDown = false;

const closeServer = async () => {
  if (!server) {
    return;
  }

  await new Promise<void>((resolve) => {
    server?.close(() => resolve());
  });
};

const closeDatabase = async () => {
  if (mongoose.connection.readyState === 0) {
    return;
  }

  try {
    await mongoose.connection.close();
  } catch (error) {
    logger.error("Failed to close database connection", error);
  }
};

const shutdown = async (signal: string, error?: unknown) => {
  if (shuttingDown) {
    return;
  }

  shuttingDown = true;
  logger.info(`Received ${signal}. Shutting down...`);

  if (error) {
    logger.error(error);
  }

  await closeServer();
  await closeDatabase();
  process.exit(error ? 1 : 0);
};

const registerProcessHandlers = () => {
  process.on("SIGINT", () => {
    void shutdown("SIGINT");
  });

  process.on("SIGTERM", () => {
    void shutdown("SIGTERM");
  });

  process.on("unhandledRejection", (reason) => {
    void shutdown("unhandledRejection", reason);
  });

  process.on("uncaughtException", (error) => {
    void shutdown("uncaughtException", error);
  });
};

export const startServer = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is not defined");
    }

    registerProcessHandlers();

    await connectDB(process.env.MONGO_URI);
    logger.info("Connected to database...");
    const app = createApp();
    const port = process.env.PORT ? Number(process.env.PORT) : 3000;
    server = app.listen(port, () => {
      logger.info(`Server is listening on port: ${port}`);
    });
  } catch (error) {
    logger.error(error);
    void shutdown("startupError", error);
  }
};

if (process.env.NODE_ENV !== "test") {
  void startServer();
}
