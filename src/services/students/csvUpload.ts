import path from "node:path";
import { fileURLToPath } from "node:url";
import csvtojson from "csvtojson";
import Student from "../../models/studentModel.js";
import studentCache from "./cache.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const studentsCsvPath = path.join(
  __dirname,
  "..",
  "..",
  "data",
  "students.csv"
);

const csvUpload = async () => {
  const studentArr = [] as Array<Record<string, unknown>>;
  const source = await csvtojson().fromFile(studentsCsvPath);
  for (let i = 0; i < source.length; i++) {
    const oneRow = {
      Name: source[i]["Name"],
      Age: source[i]["Age"],
      Mark1: source[i]["Mark1"],
      Mark2: source[i]["Mark2"],
      Mark3: source[i]["Mark3"],
    };
    studentArr.push(oneRow);
  }
  const inserted = await Student.insertMany(studentArr);
  studentCache.del("students");
  return inserted;
};

export default csvUpload;
