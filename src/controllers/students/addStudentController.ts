import type { Request, Response } from "express";
import studentSchema from "../../validators/studentSchema.js";
import addStudent from "../../services/students/addStudent.js";

const addStudentController = async (req: Request, res: Response) => {
  const { error } = studentSchema.validate(req.body);
  if (error) return res.status(400).send(error.details[0]);
  try {
    const student = await addStudent(req.body);
    res.status(201).json({ student });
  } catch (error) {
    console.log(error);
  }
};

export default addStudentController;
