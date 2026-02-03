import Student from "../../models/studentModel.js";
import studentCache from "./cache.js";

const addStudent = async (payload: Record<string, unknown>) => {
  const created = await Student.create(payload);
  studentCache.del("students");
  return created;
};

export default addStudent;
