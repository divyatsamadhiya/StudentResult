import { jest } from "@jest/globals";

test("getResultStatusController returns filtered students", async () => {
  jest.resetModules();
  const getResultStatus = jest.fn(async () => [{ Mark1: 50 }]);

  jest.unstable_mockModule(
    "../../services/students/getResultStatus.js",
    () => ({
      default: getResultStatus,
      __esModule: true,
    })
  );

  const controller = (await import("./getResultStatusController.js")).default;
  const req = { query: { resultStatus: "passed" } } as any;
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  } as any;
  await controller(req, res);
  expect(getResultStatus).toHaveBeenCalledWith("passed");
  expect(res.status).toHaveBeenCalledWith(200);
});
