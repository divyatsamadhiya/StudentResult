import { jest } from "@jest/globals";

test("csvUpload parses and inserts rows and clears cache", async () => {
  jest.resetModules();
  const fromFile = jest.fn(async () => [
    { Name: "A", Age: "10", Mark1: "40", Mark2: "50", Mark3: "60" },
  ]);
  const csvtojsonMock = jest.fn(() => ({ fromFile }));
  const insertMany = jest.fn(async () => [{ Name: "A" }]);
  const del = jest.fn();

  jest.unstable_mockModule("./cache.js", () => ({
    default: { del },
    __esModule: true,
  }));

  jest.unstable_mockModule("csvtojson", () => ({
    default: csvtojsonMock,
    __esModule: true,
  }));

  jest.unstable_mockModule("../../models/studentModel.js", () => ({
    default: { insertMany },
    __esModule: true,
  }));

  const csvUpload = (await import("./csvUpload.js")).default;
  const result = await csvUpload();
  expect(csvtojsonMock).toHaveBeenCalled();
  expect(fromFile).toHaveBeenCalled();
  expect(insertMany).toHaveBeenCalledWith([
    {
      Name: "A",
      Age: "10",
      Mark1: "40",
      Mark2: "50",
      Mark3: "60",
    },
  ]);
  expect(del).toHaveBeenCalledWith("students");
  expect(result).toEqual([{ Name: "A" }]);
});
