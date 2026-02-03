import Student from "../../models/studentModel.js";
import studentCache from "./cache.js";
import { hashPassword } from "../auth/password.js";

const addStudent = async (payload: Record<string, unknown>) => {
  if (typeof payload.password !== "string") {
    throw new Error("Password is required");
  }

  const passwordHash = await hashPassword(payload.password);
  const { password, ...rest } = payload;
  const created = await Student.create({ ...rest, passwordHash });
  studentCache.del("students");
  return created;
};

export default addStudent;
