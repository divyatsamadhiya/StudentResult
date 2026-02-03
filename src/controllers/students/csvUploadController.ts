import type { Request, Response } from "express";
import csvUpload from "../../services/students/csvUpload.js";

const csvUploadController = async (req: Request, res: Response) => {
  try {
    const data = await csvUpload();
    res.status(201).json({ data });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Failed to upload CSV" });
  }
};

export default csvUploadController;
