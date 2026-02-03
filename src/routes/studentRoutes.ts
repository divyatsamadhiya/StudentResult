import { Router } from "express";
import addStudentController from "../controllers/students/addStudentController.js";
import studentResultByIdController from "../controllers/students/studentResultByIdController.js";
import getResultStatusController from "../controllers/students/getResultStatusController.js";
import csvUploadController from "../controllers/students/csvUploadController.js";
import getAllStudentsController from "../controllers/students/getAllStudentsController.js";

const router = Router();

router.get("/students/:id/result", studentResultByIdController);
router.get("/students", getResultStatusController);
router.get("/allStudents", getAllStudentsController);
router.post("/students", addStudentController);
router.post("/upload", csvUploadController);

export default router;
