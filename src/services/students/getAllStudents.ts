import Student from "../../models/studentModel.js";
import logger from "../../configs/logger.js";
import studentCache from "./cache.js";

const getAllStudents = async () => {
  let student = studentCache.get("students");
  if (!student) {
    student = await Student.find({});
    studentCache.set("students", student, 60000);
    logger.info(`getAllStudents cache miss (${student.length} records)`);
  } else {
    logger.info("getAllStudents cache hit");
  }
  return student;
};

export default getAllStudents;
