import mongoose, { Schema } from "mongoose";

const studentSchema = new Schema({
  name: {
    type: String,
    required: [true, "Please provide the name"],
    minlength: 6,
    maxlength: 20,
  },
  age: {
    type: Number,
  },
  mark1: {
    type: Number,
    required: true,
  },
  mark2: {
    type: Number,
    required: true,
  },
  mark3: {
    type: Number,
    required: true,
  },
});

export default mongoose.model("Student", studentSchema);
