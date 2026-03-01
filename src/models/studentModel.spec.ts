import { jest } from "@jest/globals";

test("student model registers with mongoose", async () => {
  jest.resetModules();
  const model = jest.fn(() => ({ modelName: "Student" }));
  class SchemaMock {
    definition: unknown;
    constructor(definition: unknown) {
      this.definition = definition;
    }
  }

  jest.unstable_mockModule("mongoose", () => ({
    default: { model },
    Schema: SchemaMock,
    __esModule: true,
  }));

  const studentModel = (await import("./studentModel.js")).default;
  expect(model).toHaveBeenCalled();
  expect(studentModel).toEqual({ modelName: "Student" });
});
