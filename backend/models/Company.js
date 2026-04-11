const mongoose = require("mongoose");

const companySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },

  location: String,

  packageOffered: Number,

  driveDate: Date,

  eligibilityCriteria: {
    minCgpa: Number,
    branches: [String]
  }
});

module.exports = mongoose.model("Company", companySchema);