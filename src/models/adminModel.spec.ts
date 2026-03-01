import { jest } from "@jest/globals";

test("admin model registers with mongoose", async () => {
  jest.resetModules();
  const model = jest.fn(() => ({ modelName: "Admin" }));
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

  const adminModel = (await import("./adminModel.js")).default;
  expect(model).toHaveBeenCalled();
  expect(adminModel).toEqual({ modelName: "Admin" });
});
