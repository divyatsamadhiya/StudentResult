import type { Request, Response } from "express";
import getStudentResultById from "../../services/students/getStudentResultById.js";

const studentResultByIdController = async (req: Request, res: Response) => {
  try {
    const result = await getStudentResultById(req.params.id);
    if ("invalidId" in result) {
      return res.status(400).json({ status: "Failed", msg: "Invalid user Id" });
    }
    if ("notFound" in result) {
      return res
        .status(404)
        .json({ status: "Failed", msg: "Student not found" });
    }
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
  }
};

export default studentResultByIdController;
