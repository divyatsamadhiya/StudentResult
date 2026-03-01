import type { Request, Response, NextFunction } from "express";
import { verifyToken } from "../services/auth/token.js";
import Admin from "../models/adminModel.js";
import logger from "../configs/logger.js";

export type AuthRole = "admin" | "student";

export type AuthUser = {
  id: string;
  role: AuthRole;
};

export type AuthenticatedRequest = Request & { user?: AuthUser };

export const requireAuth = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const header = req.headers.authorization;
  if (!header || !header.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Missing token" });
  }

  const token = header.replace("Bearer ", "").trim();
  try {
    const payload = verifyToken(token);
    req.user = { id: payload.sub, role: payload.role };
    logger.info(`Auth success ${req.user.role} ${req.user.id}`);
    return next();
  } catch (err) {
    logger.error(err);
    return res.status(401).json({ message: "Invalid token" });
  }
};

export const requireAdmin = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  if (!req.user) {
    return res.status(401).json({ message: "Missing token" });
  }
  if (req.user.role !== "admin") {
    logger.warn(`Admin access denied ${req.user.id}`);
    return res.status(403).json({ message: "Forbidden" });
  }
  return next();
};

export const requireSelfOrAdmin = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  if (!req.user) {
    return res.status(401).json({ message: "Missing token" });
  }
  if (req.user.role === "admin") {
    logger.info(`SelfOrAdmin success admin ${req.user.id}`);
    return next();
  }
  if (req.user.id !== req.params.id) {
    logger.warn(`SelfOrAdmin denied ${req.user.id} for ${req.params.id}`);
    return res.status(403).json({ message: "Forbidden" });
  }
  logger.info(`SelfOrAdmin success student ${req.user.id}`);
  return next();
};

export const requireAdminOrBootstrap = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const count = await Admin.countDocuments({});
    if (count === 0) {
      return next();
    }
  } catch (err) {
    logger.error(err);
    return res.status(500).json({ message: "Auth check failed" });
  }

  const header = req.headers.authorization;
  if (!header || !header.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Missing token" });
  }

  const token = header.replace("Bearer ", "").trim();
  try {
    const payload = verifyToken(token);
    req.user = { id: payload.sub, role: payload.role };
  } catch (err) {
    logger.error(err);
    return res.status(401).json({ message: "Invalid token" });
  }

  if (req.user.role !== "admin") {
    logger.warn(`AdminOrBootstrap denied ${req.user.id}`);
    return res.status(403).json({ message: "Forbidden" });
  }

  logger.info(`AdminOrBootstrap success ${req.user.id}`);
  return next();
};
