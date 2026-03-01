import joi from "joi";

export const loginSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().min(6).required(),
});

export const adminRegisterSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().min(6).required(),
});
