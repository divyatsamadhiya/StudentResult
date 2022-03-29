const router = require("express").Router();
const {
    addStudent,
    studentResultById,
    getResultStatus,
    csvUpload,
    getAllStudents,
} = require("../controllers/routesController");

router.get("/students/:id/result", studentResultById);
router.get("/students", getResultStatus);
router.get("/allStudents", getAllStudents);
router.post("/students", addStudent);
router.post("/upload", csvUpload);

module.exports = router;
