import studentSchema from "./studentSchema.js";

test("student schema validates good payload", () => {
  const { error } = studentSchema.validate({
    Name: "Student",
    Age: 20,
    Mark1: 50,
    Mark2: 45,
    Mark3: 50,
  });
  expect(error).toBeUndefined();
});

test("student schema rejects invalid payload", () => {
  const { error } = studentSchema.validate({
    Name: "S",
    Mark1: 50,
    Mark2: 45,
    Mark3: 50,
  });
  expect(error).toBeDefined();
});
