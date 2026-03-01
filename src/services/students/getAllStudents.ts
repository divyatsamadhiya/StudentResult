import Student from "../../models/studentModel.js";
import logger from "../../configs/logger.js";
import studentCache from "./cache.js";

type StudentList = Awaited<ReturnType<typeof Student.find>>;

const getAllStudents = async () => {
  let students = studentCache.get<StudentList>("students");
  if (!students) {
    students = await Student.find({});
    studentCache.set("students", students);
    logger.info(`getAllStudents cache miss (${students.length} records)`);
  } else {
    logger.info("getAllStudents cache hit");
  }
  return students;
};

export default getAllStudents;
