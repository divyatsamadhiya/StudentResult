import { jest } from "@jest/globals";

test("adminRegisterController returns 400 on validation error", async () => {
  jest.resetModules();
  const validate = jest.fn(() => ({
    error: { details: [{ message: "bad" }] },
  }));

  jest.unstable_mockModule("../../validators/authSchema.js", () => ({
    adminRegisterSchema: { validate },
    __esModule: true,
  }));

  const controller = (await import("./adminRegisterController.js")).default;
  const req = { body: {} } as any;
  const res = {
    status: jest.fn().mockReturnThis(),
    send: jest.fn(),
    json: jest.fn(),
  } as any;
  await controller(req, res);
  expect(res.status).toHaveBeenCalledWith(400);
});

test("adminRegisterController returns 201 on success", async () => {
  jest.resetModules();
  const validate = jest.fn(() => ({ error: undefined }));
  const adminRegister = jest.fn(async () => ({ id: "1", email: "a@b.com" }));

  jest.unstable_mockModule("../../validators/authSchema.js", () => ({
    adminRegisterSchema: { validate },
    __esModule: true,
  }));

  jest.unstable_mockModule("../../services/auth/adminRegister.js", () => ({
    default: adminRegister,
    __esModule: true,
  }));

  const controller = (await import("./adminRegisterController.js")).default;
  const req = { body: { email: "a@b.com", password: "secret" } } as any;
  const res = {
    status: jest.fn().mockReturnThis(),
    send: jest.fn(),
    json: jest.fn(),
  } as any;
  await controller(req, res);
  expect(res.status).toHaveBeenCalledWith(201);
});
