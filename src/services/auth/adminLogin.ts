import Admin from "../../models/adminModel.js";
import logger from "../../configs/logger.js";
import { verifyPassword } from "./password.js";
import { signToken } from "./token.js";

const adminLogin = async (email: string, password: string) => {
  const admin = await Admin.findOne({ email: email.toLowerCase() }).exec();
  if (!admin) {
    logger.warn(`Admin login failed for ${email}`);
    return null;
  }

  const valid = await verifyPassword(password, admin.passwordHash);
  if (!valid) {
    logger.warn(`Admin login failed for ${email}`);
    return null;
  }

  const token = signToken({ sub: admin.id, role: "admin" });
  logger.info(`Admin login succeeded for ${admin.email}`);
  return { token };
};

export default adminLogin;
