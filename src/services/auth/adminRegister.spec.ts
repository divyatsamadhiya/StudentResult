import { jest } from "@jest/globals";

test("adminRegister returns conflict when admin exists", async () => {
  jest.resetModules();
  const findOne = jest.fn(() => ({
    exec: jest.fn(async () => ({ id: "1" })),
  }));

  jest.unstable_mockModule("../../models/adminModel.js", () => ({
    default: { findOne },
    __esModule: true,
  }));

  const adminRegister = (await import("./adminRegister.js")).default;
  const result = await adminRegister({
    email: "admin@example.com",
    password: "secret123",
  });
  expect(result).toEqual({ conflict: true });
});

test("adminRegister creates admin", async () => {
  jest.resetModules();
  const findOne = jest.fn(() => ({
    exec: jest.fn(async () => null),
  }));
  const create = jest.fn(async () => ({ id: "1", email: "admin@example.com" }));
  const hashPassword = jest.fn(async () => "hash");

  jest.unstable_mockModule("../../models/adminModel.js", () => ({
    default: { findOne, create },
    __esModule: true,
  }));
  jest.unstable_mockModule("./password.js", () => ({
    hashPassword,
    __esModule: true,
  }));

  const adminRegister = (await import("./adminRegister.js")).default;
  const result = await adminRegister({
    email: "admin@example.com",
    password: "secret123",
  });
  expect(hashPassword).toHaveBeenCalledWith("secret123");
  expect(create).toHaveBeenCalled();
  expect(result).toEqual({ id: "1", email: "admin@example.com" });
});
