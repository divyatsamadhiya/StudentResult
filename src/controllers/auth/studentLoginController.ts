import type { Request, Response } from "express";
import studentLogin from "../../services/auth/studentLogin.js";
import logger from "../../configs/logger.js";
import { loginSchema } from "../../validators/authSchema.js";

const studentLoginController = async (req: Request, res: Response) => {
  const { error } = loginSchema.validate(req.body);
  if (error) return res.status(400).send(error.details[0]);

  try {
    const { email, password } = req.body as {
      email: string;
      password: string;
    };
    const result = await studentLogin(email, password);
    if (!result) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    logger.info(`Student login response success for ${email}`);
    res.status(200).json(result);
  } catch (err) {
    logger.error(err);
    res.status(500).json({ message: "Login failed" });
  }
};

export default studentLoginController;
