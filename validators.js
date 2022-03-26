const Student = require("./models/studentModel");
const joi = require("joi");

const studentSchema = joi.object({
    Name: joi.string().required().min(6).max(20),
    Age: joi.number(),
    Mark1: joi.number().required(),
    Mark2: joi.number().required(),
    Mark3: joi.number().required(),
});

module.exports = studentSchema;
