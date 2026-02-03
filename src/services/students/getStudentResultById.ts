import mongoose from "mongoose";
import Student from "../../models/studentModel.js";

type ResultPayload = {
  name: string;
  mark1: number;
  mark2: number;
  mark3: number;
  result: "passed" | "failed";
};

type ResultResponse = { invalidId: true } | { notFound: true } | ResultPayload;

const getStudentResultById = async (id: string): Promise<ResultResponse> => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return { invalidId: true };
  }

  const student = await Student.findById(id).exec();
  if (!student) {
    return { notFound: true };
  }

  const { name, mark1, mark2, mark3 } = student;
  const result = mark1 + mark2 + mark3 > 140 ? "passed" : "failed";
  return { name, mark1, mark2, mark3, result };
};

export default getStudentResultById;
