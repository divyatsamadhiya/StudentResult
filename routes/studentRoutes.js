const router = require("express").Router();
const {
    student,
    studentResult,
    resultStatus,
    csvUpload,
} = require("../controllers/routesController");

router.post("/students", student);
router.get("/students/:id/result", studentResult);
router.get("/students", resultStatus);
router.post("/upload", csvUpload);

module.exports = router;
