const Student = require("../models/studentModel");
const mongoose = require("mongoose");
const csvtojson = require("csvtojson");
const studentSchema = require("../validators");
const NodeCache = require("node-cache");

const myCache = new NodeCache({ stdTTL: 10, deleteOnExpire: true });

const getAllStudents = async (req, res) => {
    try {
        let student = myCache.get("students");
        if (!student) {
            student = await Student.find({});
            myCache.set("students", student, 60000);
        }
        res.status(200).json({ student });
    } catch (error) {
        console.log(error);
    }
};

const addStudent = async (req, res) => {
    const { error } = studentSchema.validate(req.body);
    if (error) return res.status(400).send(error.details[0]);
    try {
        const { Name, Age, Mark1, Mark2, Mark3 } = req.body;
        const student = await Student.create(req.body);
        res.status(201).json({ student });
    } catch (error) {
        console.log(error);
    }
};

const csvUpload = async (req, res) => {
    try {
        var studentArr = [];
        csvtojson()
            .fromFile("./students.csv")
            .then((source) => {
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
                Student.insertMany(studentArr, function (err, data) {
                    if (err) return res.status(400).json({ err });
                    res.status(201).json({ data });
                });
            });
    } catch (error) {
        console.log(error);
    }
};

const studentResultById = async (req, res) => {
    try {
        const id = req.params.id;
        if (mongoose.Types.ObjectId.isValid(id)) {
            const student = await Student.findById(id).exec();
            const { Name, Mark1, Mark2, Mark3 } = student;
            if (Mark1 + Mark2 + Mark3 > 140) {
                var result = "Passed";
            } else {
                var result = "Failed";
            }
            res.status(200).json({ Name, Mark1, Mark2, Mark3, Result: result });
        } else {
            res.status(400).json({ status: "Failed", msg: "Invalid user Id" });
        }
    } catch (error) {
        console.log(error);
    }
};

const getResultStatus = async (req, res) => {
    try {
        const search = req.query.resultStatus;
        var students = await Student.find({});
        students = students.filter((student) => {
            if (search === "passed")
                return student.Mark1 + student.Mark2 + student.Mark3 >= 140;
            else if (search === "failed")
                return student.Mark1 + student.Mark2 + student.Mark3 < 140;
            else return;
        });
        res.status(200).json({ students });
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    addStudent,
    csvUpload,
    studentResultById,
    getResultStatus,
    getAllStudents,
};
