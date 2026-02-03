import Student from "../../models/studentModel.js";
import studentCache from "./cache.js";

const getAllStudents = async () => {
  let student = studentCache.get("students");
  if (!student) {
    student = await Student.find({});
    studentCache.set("students", student, 60000);
  }
  return student;
};

export default getAllStudents;
