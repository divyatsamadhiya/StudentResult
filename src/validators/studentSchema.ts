import joi from "joi";

const studentSchema = joi.object({
  name: joi.string().required().min(6).max(20),
  email: joi.string().email().required(),
  password: joi.string().min(6).required(),
  age: joi.number(),
  mark1: joi.number().required(),
  mark2: joi.number().required(),
  mark3: joi.number().required(),
});

export default studentSchema;
