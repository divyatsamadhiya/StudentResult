import { jest } from "@jest/globals";

test("getStudentResultById returns invalidId when id is invalid", async () => {
  jest.resetModules();
  const isValid = jest.fn(() => false);

  jest.unstable_mockModule("mongoose", () => ({
    default: {
      Types: {
        ObjectId: {
          isValid,
        },
      },
    },
    __esModule: true,
  }));

  jest.unstable_mockModule("../../models/studentModel.js", () => ({
    default: { findById: jest.fn() },
    __esModule: true,
  }));

  const getStudentResultById = (await import("./getStudentResultById.js"))
    .default;
  const result = await getStudentResultById("bad");
  expect(result).toEqual({ invalidId: true });
});

test("getStudentResultById returns notFound when student missing", async () => {
  jest.resetModules();
  const isValid = jest.fn(() => true);
  const findById = jest.fn(() => ({
    exec: jest.fn(async () => null),
  }));

  jest.unstable_mockModule("mongoose", () => ({
    default: {
      Types: {
        ObjectId: {
          isValid,
        },
      },
    },
    __esModule: true,
  }));

  jest.unstable_mockModule("../../models/studentModel.js", () => ({
    default: { findById },
    __esModule: true,
  }));

  const getStudentResultById = (await import("./getStudentResultById.js"))
    .default;
  const result = await getStudentResultById("507f1f77bcf86cd799439011");
  expect(result).toEqual({ notFound: true });
});

test("getStudentResultById returns result payload", async () => {
  jest.resetModules();
  const isValid = jest.fn(() => true);
  const findById = jest.fn(() => ({
    exec: jest.fn(async () => ({
      name: "Student",
      mark1: 50,
      mark2: 50,
      mark3: 50,
    })),
  }));

  jest.unstable_mockModule("mongoose", () => ({
    default: {
      Types: {
        ObjectId: {
          isValid,
        },
      },
    },
    __esModule: true,
  }));

  jest.unstable_mockModule("../../models/studentModel.js", () => ({
    default: { findById },
    __esModule: true,
  }));

  const getStudentResultById = (await import("./getStudentResultById.js"))
    .default;
  const result = await getStudentResultById("507f1f77bcf86cd799439011");
  expect(result).toEqual({
    name: "Student",
    mark1: 50,
    mark2: 50,
    mark3: 50,
    result: "passed",
  });
});
