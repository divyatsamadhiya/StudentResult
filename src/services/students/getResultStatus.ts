import Student from "../../models/studentModel.js";

const getResultStatus = async (search: string | undefined) => {
  let students = await Student.find({});
  students = students.filter(
    (student: { Mark1: number; Mark2: number; Mark3: number }) => {
      if (search === "passed")
        return student.Mark1 + student.Mark2 + student.Mark3 >= 140;
      if (search === "failed")
        return student.Mark1 + student.Mark2 + student.Mark3 < 140;
      return false;
    }
  );
  return students;
};

export default getResultStatus;
