import { jest } from "@jest/globals";

test("addStudent delegates to Student.create and clears cache", async () => {
  jest.resetModules();
  const create = jest.fn(async () => ({ name: "Student" }));
  const del = jest.fn();

  jest.unstable_mockModule("./cache.js", () => ({
    default: { del },
    __esModule: true,
  }));

  jest.unstable_mockModule("../../models/studentModel.js", () => ({
    default: { create },
    __esModule: true,
  }));

  const addStudent = (await import("./addStudent.js")).default;
  const payload = { name: "Student", mark1: 50, mark2: 50, mark3: 50 };
  await addStudent(payload);
  expect(create).toHaveBeenCalledWith(payload);
  expect(del).toHaveBeenCalledWith("students");
});
