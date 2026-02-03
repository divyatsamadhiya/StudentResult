import { jest } from "@jest/globals";

test("createApp configures express app", async () => {
  jest.resetModules();
  const listen = jest.fn((_port: unknown, cb?: () => void) => {
    cb?.();
    return {
      address: () => ({ port: 3000 }),
    };
  });
  const use = jest.fn();
  const mockApp = { use, listen };
  const expressFn = Object.assign(
    jest.fn(() => mockApp),
    {
      json: jest.fn(() => "json-mw"),
    }
  );
  const connectDB = jest.fn();

  jest.unstable_mockModule("express", () => ({
    default: expressFn,
    __esModule: true,
  }));

  jest.unstable_mockModule("./configs/db.js", () => ({
    default: connectDB,
    __esModule: true,
  }));

  jest.unstable_mockModule("./routes/studentRoutes.js", () => ({
    default: "router",
    __esModule: true,
  }));

  jest.unstable_mockModule("./configs/env.js", () => ({}));

  process.env.NODE_ENV = "test";
  process.env.MONGO_URI = "mongodb://test";

  const { createApp } = await import("./app.js");
  const app = createApp();
  expect(expressFn).toHaveBeenCalled();
  expect(app).toBe(mockApp);
  expect(use).toHaveBeenCalledWith("json-mw");
});

test("startServer connects and listens", async () => {
  jest.resetModules();
  const listen = jest.fn((_port: unknown, cb?: () => void) => {
    cb?.();
    return {
      address: () => ({ port: 3000 }),
    };
  });
  const use = jest.fn();
  const mockApp = { use, listen };
  const expressFn = Object.assign(
    jest.fn(() => mockApp),
    {
      json: jest.fn(() => "json-mw"),
    }
  );
  const connectDB = jest.fn();

  jest.unstable_mockModule("express", () => ({
    default: expressFn,
    __esModule: true,
  }));

  jest.unstable_mockModule("./configs/db.js", () => ({
    default: connectDB,
    __esModule: true,
  }));

  jest.unstable_mockModule("./routes/studentRoutes.js", () => ({
    default: "router",
    __esModule: true,
  }));

  jest.unstable_mockModule("./configs/env.js", () => ({}));

  process.env.NODE_ENV = "test";
  process.env.MONGO_URI = "mongodb://test";

  const { startServer } = await import("./app.js");
  await startServer();
  expect(connectDB).toHaveBeenCalledWith("mongodb://test");
  expect(listen).toHaveBeenCalled();
});
