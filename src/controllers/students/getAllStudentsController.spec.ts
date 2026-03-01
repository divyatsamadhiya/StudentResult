import { jest } from "@jest/globals";

test("getAllStudentsController returns students", async () => {
  jest.resetModules();
  const getAllStudents = jest.fn(async () => [{ name: "A" }]);

  jest.unstable_mockModule("../../services/students/getAllStudents.js", () => ({
    default: getAllStudents,
    __esModule: true,
  }));

  const controller = (await import("./getAllStudentsController.js")).default;
  const req = {} as any;
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  } as any;
  await controller(req, res);
  expect(getAllStudents).toHaveBeenCalled();
  expect(res.status).toHaveBeenCalledWith(200);
});
