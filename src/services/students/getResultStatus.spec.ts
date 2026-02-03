import { jest } from "@jest/globals";

test("getResultStatus filters passed", async () => {
  jest.resetModules();
  const find = jest.fn(async () => [
    { Mark1: 50, Mark2: 50, Mark3: 50 },
    { Mark1: 40, Mark2: 40, Mark3: 40 },
  ]);

  jest.unstable_mockModule("../../models/studentModel.js", () => ({
    default: { find },
    __esModule: true,
  }));

  const getResultStatus = (await import("./getResultStatus.js")).default;
  const result = await getResultStatus("passed");
  expect(result).toEqual([{ Mark1: 50, Mark2: 50, Mark3: 50 }]);
});

test("getResultStatus filters failed", async () => {
  jest.resetModules();
  const find = jest.fn(async () => [
    { Mark1: 50, Mark2: 50, Mark3: 50 },
    { Mark1: 40, Mark2: 40, Mark3: 40 },
  ]);

  jest.unstable_mockModule("../../models/studentModel.js", () => ({
    default: { find },
    __esModule: true,
  }));

  const getResultStatus = (await import("./getResultStatus.js")).default;
  const result = await getResultStatus("failed");
  expect(result).toEqual([{ Mark1: 40, Mark2: 40, Mark3: 40 }]);
});
