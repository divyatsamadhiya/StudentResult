import { jest } from "@jest/globals";
import type { AuthenticatedRequest } from "./auth.js";

const makeRes = () => ({
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
});

const next = jest.fn();

test("requireAuth rejects missing token", async () => {
  jest.resetModules();
  const { requireAuth } = await import("./auth.js");
  const req = { headers: {} } as AuthenticatedRequest;
  const res = makeRes();
  requireAuth(req, res as any, next);
  expect(res.status).toHaveBeenCalledWith(401);
});

test("requireAuth accepts valid token", async () => {
  jest.resetModules();
  const verifyToken = jest.fn(() => ({ sub: "1", role: "admin" }));
  jest.unstable_mockModule("../services/auth/token.js", () => ({
    verifyToken,
    __esModule: true,
  }));
  const { requireAuth } = await import("./auth.js");
  const req = {
    headers: { authorization: "Bearer token" },
  } as AuthenticatedRequest;
  const res = makeRes();
  requireAuth(req, res as any, next);
  expect(next).toHaveBeenCalled();
});

test("requireAdmin rejects non-admin", async () => {
  jest.resetModules();
  const { requireAdmin } = await import("./auth.js");
  const req = { user: { id: "1", role: "student" } } as AuthenticatedRequest;
  const res = makeRes();
  requireAdmin(req, res as any, next);
  expect(res.status).toHaveBeenCalledWith(403);
});

test("requireSelfOrAdmin rejects other student", async () => {
  jest.resetModules();
  const { requireSelfOrAdmin } = await import("./auth.js");
  const req = {
    user: { id: "1", role: "student" },
    params: { id: "2" },
  } as unknown as AuthenticatedRequest;
  const res = makeRes();
  requireSelfOrAdmin(req, res as any, next);
  expect(res.status).toHaveBeenCalledWith(403);
});

test("requireAdminOrBootstrap allows bootstrap when no admins exist", async () => {
  jest.resetModules();
  const countDocuments = jest.fn(async () => 0);
  jest.unstable_mockModule("../models/adminModel.js", () => ({
    default: { countDocuments },
    __esModule: true,
  }));
  const { requireAdminOrBootstrap } = await import("./auth.js");
  const req = { headers: {} } as AuthenticatedRequest;
  const res = makeRes();
  await requireAdminOrBootstrap(req, res as any, next);
  expect(next).toHaveBeenCalled();
});

test("requireAdminOrBootstrap enforces admin when admins exist", async () => {
  jest.resetModules();
  const countDocuments = jest.fn(async () => 1);
  const verifyToken = jest.fn(() => ({ sub: "1", role: "admin" }));
  jest.unstable_mockModule("../models/adminModel.js", () => ({
    default: { countDocuments },
    __esModule: true,
  }));
  jest.unstable_mockModule("../services/auth/token.js", () => ({
    verifyToken,
    __esModule: true,
  }));
  const { requireAdminOrBootstrap } = await import("./auth.js");
  const req = {
    headers: { authorization: "Bearer token" },
  } as AuthenticatedRequest;
  const res = makeRes();
  await requireAdminOrBootstrap(req, res as any, next);
  expect(next).toHaveBeenCalled();
});
