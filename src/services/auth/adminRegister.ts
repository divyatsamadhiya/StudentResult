import Admin from "../../models/adminModel.js";
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
    return { conflict: true };
  }

  const passwordHash = await hashPassword(payload.password);
  const admin = await Admin.create({
    email: payload.email.toLowerCase(),
    passwordHash,
  });

  return { id: admin.id, email: admin.email };
};

export default adminRegister;
