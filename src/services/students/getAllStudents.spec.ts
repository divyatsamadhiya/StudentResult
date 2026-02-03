import { jest } from "@jest/globals";

test("getAllStudents fetches and caches", async () => {
  jest.resetModules();
  const find = jest.fn(async () => [{ name: "Student" }]);
  const get = jest.fn(() => undefined);
  const set = jest.fn();

  jest.unstable_mockModule("./cache.js", () => ({
    default: { get, set },
    __esModule: true,
  }));

  jest.unstable_mockModule("../../models/studentModel.js", () => ({
    default: { find },
    __esModule: true,
  }));

  const getAllStudents = (await import("./getAllStudents.js")).default;
  const result = await getAllStudents();
  expect(find).toHaveBeenCalled();
  expect(set).toHaveBeenCalled();
  expect(result).toEqual([{ name: "Student" }]);
});
