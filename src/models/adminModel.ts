import mongoose, { Schema } from "mongoose";

const adminSchema = new Schema({
  email: {
    type: String,
    required: [true, "Please provide the email"],
    unique: true,
    lowercase: true,
    trim: true,
  },
  passwordHash: {
    type: String,
    required: [true, "Please provide the password hash"],
  },
});

export default mongoose.model("Admin", adminSchema);
