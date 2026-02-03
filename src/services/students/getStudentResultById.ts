import mongoose from "mongoose";
import Student from "../../models/studentModel.js";

type ResultPayload = {
  Name: string;
  Mark1: number;
  Mark2: number;
  Mark3: number;
  Result: "Passed" | "Failed";
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

  const { Name, Mark1, Mark2, Mark3 } = student;
  const result = Mark1 + Mark2 + Mark3 > 140 ? "Passed" : "Failed";
  return { Name, Mark1, Mark2, Mark3, Result: result };
};

export default getStudentResultById;
