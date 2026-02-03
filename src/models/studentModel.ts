import mongoose, { Schema } from "mongoose";

const studentSchema = new Schema({
  Name: {
    type: String,
    required: [true, "Please provide the name"],
    minlength: 6,
    maxlength: 20,
  },
  Age: {
    type: Number,
  },
  Mark1: {
    type: Number,
    required: true,
  },
  Mark2: {
    type: Number,
    required: true,
  },
  Mark3: {
    type: Number,
    required: true,
  },
});

export default mongoose.model("Student", studentSchema);
