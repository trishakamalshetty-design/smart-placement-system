const express = require("express");
const router = express.Router();
const Company = require("../models/Company");

// ADD COMPANY
router.post("/", async (req, res) => {
  try {
    const company = new Company(req.body);
    await company.save();
    res.json(company);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET ALL COMPANIES
router.get("/", async (req, res) => {
  const companies = await Company.find();
  res.json(companies);
});

module.exports = router;