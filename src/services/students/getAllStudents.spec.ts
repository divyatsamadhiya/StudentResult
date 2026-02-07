import { jest } from "@jest/globals";

test("getAllStudents fetches on miss and returns cached value on hit", async () => {
  jest.resetModules();
  const find = jest.fn(async () => [{ name: "Student" }]);
  const get = jest
    .fn()
    .mockReturnValueOnce(undefined)
    .mockReturnValueOnce([{ name: "Student" }]);
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
  const firstResult = await getAllStudents();
  const secondResult = await getAllStudents();

  expect(find).toHaveBeenCalled();
  expect(find).toHaveBeenCalledTimes(1);
  expect(set).toHaveBeenCalledWith("students", [{ name: "Student" }]);
  expect(set).toHaveBeenCalledTimes(1);
  expect(firstResult).toEqual([{ name: "Student" }]);
  expect(secondResult).toEqual([{ name: "Student" }]);
});
