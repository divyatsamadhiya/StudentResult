import { jest } from "@jest/globals";

test("env config calls dotenv.config", async () => {
  jest.resetModules();
  const config = jest.fn();

  jest.unstable_mockModule("dotenv", () => ({
    default: { config },
    __esModule: true,
  }));

  await import("./env.js");
  expect(config).toHaveBeenCalled();
});
