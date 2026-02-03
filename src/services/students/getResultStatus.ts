import Student from "../../models/studentModel.js";

const getResultStatus = async (search: string | undefined) => {
  let students = await Student.find({});
  students = students.filter(
    (student: { mark1: number; mark2: number; mark3: number }) => {
      if (search === "passed")
        return student.mark1 + student.mark2 + student.mark3 >= 140;
      if (search === "failed")
        return student.mark1 + student.mark2 + student.mark3 < 140;
      return false;
    }
  );
  return students;
};

export default getResultStatus;
