import { hashPassword, verifyPassword } from "./password.js";

test("hashPassword and verifyPassword", async () => {
  const hash = await hashPassword("secret123");
  const valid = await verifyPassword("secret123", hash);
  const invalid = await verifyPassword("wrong", hash);
  expect(valid).toBe(true);
  expect(invalid).toBe(false);
});
