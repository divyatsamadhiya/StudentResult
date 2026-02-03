import { loginSchema } from "./authSchema.js";

test("login schema validates valid payload", () => {
  const { error } = loginSchema.validate({
    email: "test@example.com",
    password: "secret123",
  });
  expect(error).toBeUndefined();
});

test("login schema rejects invalid payload", () => {
  const { error } = loginSchema.validate({ email: "bad" });
  expect(error).toBeDefined();
});
