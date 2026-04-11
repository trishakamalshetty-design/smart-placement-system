const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  branch: { type: String, required: true },
  cgpa: { type: Number, required: true },
  year: { type: Number, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  placementStatus: {
    type: String,
    enum: ["pending", "selected", "rejected"],
    default: "pending"
  }
});

module.exports = mongoose.model("Student", studentSchema);