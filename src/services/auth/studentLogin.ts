import Student from "../../models/studentModel.js";
import logger from "../../configs/logger.js";
import { verifyPassword } from "./password.js";
import { signToken } from "./token.js";

const studentLogin = async (email: string, password: string) => {
  const student = await Student.findOne({ email: email.toLowerCase() }).exec();
  if (!student) {
    logger.warn(`Student login failed for ${email}`);
    return null;
  }

  const valid = await verifyPassword(password, student.passwordHash);
  if (!valid) {
    logger.warn(`Student login failed for ${email}`);
    return null;
  }

  const token = signToken({ sub: student.id, role: "student" });
  logger.info(`Student login succeeded for ${student.email}`);
  return { token, studentId: student.id };
};

export default studentLogin;
