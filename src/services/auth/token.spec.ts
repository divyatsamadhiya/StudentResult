import { signToken, verifyToken } from "./token.js";

test("signToken and verifyToken round-trip", () => {
  process.env.JWT_SECRET = "test-secret";
  process.env.JWT_EXPIRES_IN = "30m";
  const token = signToken({ sub: "123", role: "admin" });
  const payload = verifyToken(token);
  expect(payload.sub).toBe("123");
  expect(payload.role).toBe("admin");
});
