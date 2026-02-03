import { jest } from "@jest/globals";

test("studentLogin returns token when credentials are valid", async () => {
  jest.resetModules();
  const findOne = jest.fn(() => ({
    exec: jest.fn(async () => ({ id: "1", passwordHash: "hash" })),
  }));
  const verifyPassword = jest.fn(async () => true);
  const signToken = jest.fn(() => "token");

  jest.unstable_mockModule("../../models/studentModel.js", () => ({
    default: { findOne },
    __esModule: true,
  }));
  jest.unstable_mockModule("./password.js", () => ({
    verifyPassword,
    __esModule: true,
  }));
  jest.unstable_mockModule("./token.js", () => ({
    signToken,
    __esModule: true,
  }));

  const studentLogin = (await import("./studentLogin.js")).default;
  const result = await studentLogin("student@example.com", "secret");
  expect(result).toEqual({ token: "token", studentId: "1" });
});

test("studentLogin returns null when credentials are invalid", async () => {
  jest.resetModules();
  const findOne = jest.fn(() => ({
    exec: jest.fn(async () => null),
  }));

  jest.unstable_mockModule("../../models/studentModel.js", () => ({
    default: { findOne },
    __esModule: true,
  }));

  const studentLogin = (await import("./studentLogin.js")).default;
  const result = await studentLogin("student@example.com", "secret");
  expect(result).toBeNull();
});
