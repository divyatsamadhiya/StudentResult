import { Router } from "express";
import addStudentController from "../controllers/students/addStudentController.js";
import studentResultByIdController from "../controllers/students/studentResultByIdController.js";
import getResultStatusController from "../controllers/students/getResultStatusController.js";
import csvUploadController from "../controllers/students/csvUploadController.js";
import getAllStudentsController from "../controllers/students/getAllStudentsController.js";
import {
  requireAdmin,
  requireAuth,
  requireSelfOrAdmin,
} from "../middlewares/auth.js";

const router = Router();

router.get(
  "/students/:id/result",
  requireAuth,
  requireSelfOrAdmin,
  studentResultByIdController
);
router.get("/students", requireAuth, requireAdmin, getResultStatusController);
router.get("/allStudents", requireAuth, requireAdmin, getAllStudentsController);
router.post("/students", requireAuth, requireAdmin, addStudentController);
router.post("/upload", requireAuth, requireAdmin, csvUploadController);

export default router;
