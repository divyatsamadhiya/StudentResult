import { jest } from "@jest/globals";

test("addStudentController returns 400 on validation error", async () => {
  jest.resetModules();
  const validate = jest.fn(() => ({
    error: { details: [{ message: "bad" }] },
  }));
  const addStudent = jest.fn(async () => ({ name: "Student" }));

  jest.unstable_mockModule("../../validators/studentSchema.js", () => ({
    default: { validate },
    __esModule: true,
  }));

  jest.unstable_mockModule("../../services/students/addStudent.js", () => ({
    default: addStudent,
    __esModule: true,
  }));

  const controller = (await import("./addStudentController.js")).default;
  const req = { body: {} } as any;
  const res = {
    status: jest.fn().mockReturnThis(),
    send: jest.fn(),
    json: jest.fn(),
  } as any;
  await controller(req, res);
  expect(res.status).toHaveBeenCalledWith(400);
});

test("addStudentController creates student", async () => {
  jest.resetModules();
  const validate = jest.fn(() => ({ error: undefined }));
  const addStudent = jest.fn(async () => ({ name: "Student" }));

  jest.unstable_mockModule("../../validators/studentSchema.js", () => ({
    default: { validate },
    __esModule: true,
  }));

  jest.unstable_mockModule("../../services/students/addStudent.js", () => ({
    default: addStudent,
    __esModule: true,
  }));

  const controller = (await import("./addStudentController.js")).default;
  const req = { body: { name: "Student" } } as any;
  const res = {
    status: jest.fn().mockReturnThis(),
    send: jest.fn(),
    json: jest.fn(),
  } as any;
  await controller(req, res);
  expect(addStudent).toHaveBeenCalledWith(req.body);
  expect(res.status).toHaveBeenCalledWith(201);
});
