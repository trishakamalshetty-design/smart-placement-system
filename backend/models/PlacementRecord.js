const mongoose = require("mongoose");

const placementRecordSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: true
  },

  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company",
    required: true
  },

  status: {
    type: String,
    enum: ["pending", "selected", "rejected"],
    default: "pending"
  },

  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("PlacementRecord", placementRecordSchema);