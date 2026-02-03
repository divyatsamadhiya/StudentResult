import { jest } from "@jest/globals";

test("connectDB calls mongoose.connect", async () => {
  jest.resetModules();
  const connect = jest.fn();

  jest.unstable_mockModule("mongoose", () => ({
    default: { connect },
    __esModule: true,
  }));

  const connectDB = (await import("./db.js")).default;
  await connectDB("mongodb://test");
  expect(connect).toHaveBeenCalledWith("mongodb://test");
});
