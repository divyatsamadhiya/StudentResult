import { jest } from "@jest/globals";

test("getResultStatus filters passed", async () => {
  jest.resetModules();
  const find = jest.fn(async () => [
    { mark1: 50, mark2: 50, mark3: 50 },
    { mark1: 40, mark2: 40, mark3: 40 },
  ]);

  jest.unstable_mockModule("../../models/studentModel.js", () => ({
    default: { find },
    __esModule: true,
  }));

  const getResultStatus = (await import("./getResultStatus.js")).default;
  const result = await getResultStatus("passed");
  expect(result).toEqual([{ mark1: 50, mark2: 50, mark3: 50 }]);
});

test("getResultStatus filters failed", async () => {
  jest.resetModules();
  const find = jest.fn(async () => [
    { mark1: 50, mark2: 50, mark3: 50 },
    { mark1: 40, mark2: 40, mark3: 40 },
  ]);

  jest.unstable_mockModule("../../models/studentModel.js", () => ({
    default: { find },
    __esModule: true,
  }));

  const getResultStatus = (await import("./getResultStatus.js")).default;
  const result = await getResultStatus("failed");
  expect(result).toEqual([{ mark1: 40, mark2: 40, mark3: 40 }]);
});
