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
      name: source[i]["name"] ?? source[i]["Name"],
      age: source[i]["age"] ?? source[i]["Age"],
      mark1: source[i]["mark1"] ?? source[i]["Mark1"],
      mark2: source[i]["mark2"] ?? source[i]["Mark2"],
      mark3: source[i]["mark3"] ?? source[i]["Mark3"],
    };
    studentArr.push(oneRow);
  }
  const inserted = await Student.insertMany(studentArr);
  studentCache.del("students");
  return inserted;
};

export default csvUpload;
