import { Router } from "express";
import adminLoginController from "../controllers/auth/adminLoginController.js";
import adminRegisterController from "../controllers/auth/adminRegisterController.js";
import studentLoginController from "../controllers/auth/studentLoginController.js";
import { requireAdminOrBootstrap } from "../middlewares/auth.js";

const router = Router();

router.post("/admin/login", adminLoginController);
router.post(
  "/admin/register",
  requireAdminOrBootstrap,
  adminRegisterController
);
router.post("/student/login", studentLoginController);

export default router;
