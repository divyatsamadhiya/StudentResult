import type { Request, Response } from "express";
import adminRegister from "../../services/auth/adminRegister.js";
import { adminRegisterSchema } from "../../validators/authSchema.js";

const adminRegisterController = async (req: Request, res: Response) => {
  const { error } = adminRegisterSchema.validate(req.body);
  if (error) return res.status(400).send(error.details[0]);

  try {
    const { email, password } = req.body as {
      email: string;
      password: string;
    };
    const result = await adminRegister({ email, password });
    if ("conflict" in result) {
      return res.status(409).json({ message: "Admin already exists" });
    }
    res.status(201).json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Registration failed" });
  }
};

export default adminRegisterController;
