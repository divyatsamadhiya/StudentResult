import type { Request, Response } from "express";
import studentSchema from "../../validators/studentSchema.js";
import addStudent from "../../services/students/addStudent.js";
import logger from "../../configs/logger.js";

const addStudentController = async (req: Request, res: Response) => {
  const { error } = studentSchema.validate(req.body);
  if (error) return res.status(400).send(error.details[0]);
  try {
    const student = await addStudent(req.body);
    logger.info(`addStudentController created ${student.id}`);
    res.status(201).json({ student });
  } catch (error) {
    logger.error(error);
  }
};

export default addStudentController;
