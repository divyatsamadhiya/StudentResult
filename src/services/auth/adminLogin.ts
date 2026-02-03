import Admin from "../../models/adminModel.js";
import { verifyPassword } from "./password.js";
import { signToken } from "./token.js";

const adminLogin = async (email: string, password: string) => {
  const admin = await Admin.findOne({ email: email.toLowerCase() }).exec();
  if (!admin) {
    return null;
  }

  const valid = await verifyPassword(password, admin.passwordHash);
  if (!valid) {
    return null;
  }

  const token = signToken({ sub: admin.id, role: "admin" });
  return { token };
};

export default adminLogin;
