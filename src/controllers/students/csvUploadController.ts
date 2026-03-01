import type { Request, Response } from "express";
import csvUpload from "../../services/students/csvUpload.js";
import logger from "../../configs/logger.js";

const csvUploadController = async (req: Request, res: Response) => {
  try {
    const data = await csvUpload();
    logger.info(`csvUploadController inserted ${data.length} records`);
    res.status(201).json({ data });
  } catch (error) {
    logger.error(error);
    res.status(400).json({ error: "Failed to upload CSV" });
  }
};

export default csvUploadController;
