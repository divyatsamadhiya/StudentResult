import Admin from "../../models/adminModel.js";
import logger from "../../configs/logger.js";
import { hashPassword } from "./password.js";

type RegisterPayload = {
  email: string;
  password: string;
};

type RegisterResult = { conflict: true } | { id: string; email: string };

const adminRegister = async (
  payload: RegisterPayload
): Promise<RegisterResult> => {
  const existing = await Admin.findOne({
    email: payload.email.toLowerCase(),
  }).exec();
  if (existing) {
    logger.warn(`Admin register conflict for ${payload.email}`);
    return { conflict: true };
  }

  const passwordHash = await hashPassword(payload.password);
  const admin = await Admin.create({
    email: payload.email.toLowerCase(),
    passwordHash,
  });

  logger.info(`Admin registered ${admin.email}`);
  return { id: admin.id, email: admin.email };
};

export default adminRegister;
