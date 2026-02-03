import type { Request, Response } from "express";
import getAllStudents from "../../services/students/getAllStudents.js";

const getAllStudentsController = async (req: Request, res: Response) => {
  try {
    const student = await getAllStudents();
    res.status(200).json({ student });
  } catch (error) {
    console.log(error);
  }
};

export default getAllStudentsController;
