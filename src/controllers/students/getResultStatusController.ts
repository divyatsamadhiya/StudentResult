import type { Request, Response } from "express";
import getResultStatus from "../../services/students/getResultStatus.js";

const getResultStatusController = async (req: Request, res: Response) => {
  try {
    const search = req.query.resultStatus as string | undefined;
    const students = await getResultStatus(search);
    res.status(200).json({ students });
  } catch (error) {
    console.log(error);
  }
};

export default getResultStatusController;
