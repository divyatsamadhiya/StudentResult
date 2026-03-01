import { jest } from "@jest/globals";

test("csvUpload parses and inserts rows and clears cache", async () => {
  jest.resetModules();
  const fromFile = jest.fn(async () => [
    {
      name: "A",
      email: "a@example.com",
      password: "secret123",
      age: "10",
      mark1: "40",
      mark2: "50",
      mark3: "60",
    },
  ]);
  const csvtojsonMock = jest.fn(() => ({ fromFile }));
  const insertMany = jest.fn(async () => [{ name: "A" }]);
  const del = jest.fn();
  const hashPassword = jest.fn(async () => "hash");

  jest.unstable_mockModule("./cache.js", () => ({
    default: { del },
    __esModule: true,
  }));

  jest.unstable_mockModule("../auth/password.js", () => ({
    hashPassword,
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
  expect(hashPassword).toHaveBeenCalledWith("secret123");
  expect(insertMany).toHaveBeenCalledWith([
    {
      name: "A",
      email: "a@example.com",
      passwordHash: "hash",
      age: "10",
      mark1: "40",
      mark2: "50",
      mark3: "60",
    },
  ]);
  expect(del).toHaveBeenCalledWith("students");
  expect(result).toEqual([{ name: "A" }]);
});
