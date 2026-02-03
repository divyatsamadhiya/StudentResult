import Student from "../../models/studentModel.js";
import { verifyPassword } from "./password.js";
import { signToken } from "./token.js";

const studentLogin = async (email: string, password: string) => {
  const student = await Student.findOne({ email: email.toLowerCase() }).exec();
  if (!student) {
    return null;
  }

  const valid = await verifyPassword(password, student.passwordHash);
  if (!valid) {
    return null;
  }

  const token = signToken({ sub: student.id, role: "student" });
  return { token, studentId: student.id };
};

export default studentLogin;
