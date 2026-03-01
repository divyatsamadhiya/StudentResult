import type { Request, Response } from "express";
import getAllStudents from "../../services/students/getAllStudents.js";
import logger from "../../configs/logger.js";

const getAllStudentsController = async (req: Request, res: Response) => {
  try {
    const student = await getAllStudents();
    logger.info(`getAllStudentsController returned ${student.length} records`);
    res.status(200).json({ student });
  } catch (error) {
    logger.error(error);
  }
};

export default getAllStudentsController;
