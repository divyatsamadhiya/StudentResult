import { jest } from "@jest/globals";

test("studentResultByIdController handles invalid id", async () => {
  jest.resetModules();
  const getStudentResultById = jest.fn(async () => ({ invalidId: true }));

  jest.unstable_mockModule(
    "../../services/students/getStudentResultById.js",
    () => ({
      default: getStudentResultById,
      __esModule: true,
    })
  );

  const controller = (await import("./studentResultByIdController.js")).default;
  const req = { params: { id: "bad" } } as any;
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  } as any;
  await controller(req, res);
  expect(res.status).toHaveBeenCalledWith(400);
});

test("studentResultByIdController handles not found", async () => {
  jest.resetModules();
  const getStudentResultById = jest.fn(async () => ({ notFound: true }));

  jest.unstable_mockModule(
    "../../services/students/getStudentResultById.js",
    () => ({
      default: getStudentResultById,
      __esModule: true,
    })
  );

  const controller = (await import("./studentResultByIdController.js")).default;
  const req = { params: { id: "missing" } } as any;
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  } as any;
  await controller(req, res);
  expect(res.status).toHaveBeenCalledWith(404);
});

test("studentResultByIdController returns payload", async () => {
  jest.resetModules();
  const getStudentResultById = jest.fn(async () => ({
    name: "Student",
    mark1: 50,
    mark2: 50,
    mark3: 50,
    result: "passed",
  }));

  jest.unstable_mockModule(
    "../../services/students/getStudentResultById.js",
    () => ({
      default: getStudentResultById,
      __esModule: true,
    })
  );

  const controller = (await import("./studentResultByIdController.js")).default;
  const req = { params: { id: "ok" } } as any;
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  } as any;
  await controller(req, res);
  expect(res.status).toHaveBeenCalledWith(200);
});
