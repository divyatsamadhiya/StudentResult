import studentSchema from "./studentSchema.js";

test("student schema validates good payload", () => {
  const { error } = studentSchema.validate({
    name: "Student",
    age: 20,
    mark1: 50,
    mark2: 45,
    mark3: 50,
  });
  expect(error).toBeUndefined();
});

test("student schema rejects invalid payload", () => {
  const { error } = studentSchema.validate({
    name: "S",
    mark1: 50,
    mark2: 45,
    mark3: 50,
  });
  expect(error).toBeDefined();
});
