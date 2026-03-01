import { jest } from "@jest/globals";

test("csvUploadController returns data", async () => {
  jest.resetModules();
  const csvUpload = jest.fn(async () => [{ Name: "A" }]);

  jest.unstable_mockModule("../../services/students/csvUpload.js", () => ({
    default: csvUpload,
    __esModule: true,
  }));

  const controller = (await import("./csvUploadController.js")).default;
  const req = {} as any;
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  } as any;
  await controller(req, res);
  expect(csvUpload).toHaveBeenCalled();
  expect(res.status).toHaveBeenCalledWith(201);
});
