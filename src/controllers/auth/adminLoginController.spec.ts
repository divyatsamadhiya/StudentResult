import { jest } from "@jest/globals";

test("adminLoginController returns 400 on validation error", async () => {
  jest.resetModules();
  const validate = jest.fn(() => ({
    error: { details: [{ message: "bad" }] },
  }));

  jest.unstable_mockModule("../../validators/authSchema.js", () => ({
    loginSchema: { validate },
    __esModule: true,
  }));

  const controller = (await import("./adminLoginController.js")).default;
  const req = { body: {} } as any;
  const res = {
    status: jest.fn().mockReturnThis(),
    send: jest.fn(),
    json: jest.fn(),
  } as any;
  await controller(req, res);
  expect(res.status).toHaveBeenCalledWith(400);
});

test("adminLoginController returns token", async () => {
  jest.resetModules();
  const validate = jest.fn(() => ({ error: undefined }));
  const adminLogin = jest.fn(async () => ({ token: "token" }));

  jest.unstable_mockModule("../../validators/authSchema.js", () => ({
    loginSchema: { validate },
    __esModule: true,
  }));

  jest.unstable_mockModule("../../services/auth/adminLogin.js", () => ({
    default: adminLogin,
    __esModule: true,
  }));

  const controller = (await import("./adminLoginController.js")).default;
  const req = { body: { email: "a@b.com", password: "secret" } } as any;
  const res = {
    status: jest.fn().mockReturnThis(),
    send: jest.fn(),
    json: jest.fn(),
  } as any;
  await controller(req, res);
  expect(res.status).toHaveBeenCalledWith(200);
});
