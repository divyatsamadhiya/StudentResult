import type { Request, Response } from "express";
import getResultStatus from "../../services/students/getResultStatus.js";
import logger from "../../configs/logger.js";

const getResultStatusController = async (req: Request, res: Response) => {
  try {
    const search = req.query.resultStatus as string | undefined;
    const students = await getResultStatus(search);
    logger.info(
      `getResultStatusController ${search} -> ${students.length} records`
    );
    res.status(200).json({ students });
  } catch (error) {
    logger.error(error);
  }
};

export default getResultStatusController;
