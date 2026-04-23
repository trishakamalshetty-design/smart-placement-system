const express = require("express");
const Company = require("../models/Company");

const auth = require("../middleware/authMiddleware");
const allowAdmin = require("../middleware/allowAdmin");

const router = express.Router();

// ➕ ADD company — ADMIN ONLY
router.post("/", auth, allowAdmin, async (req, res) => {
  try {
    const company = await Company.create(req.body);
    res.status(201).json(company);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 📄 GET all companies — ADMIN + VIEWER
router.get("/", async (req, res) => {
  try {
    const companies = await Company.find();
    res.json(companies);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ❌ DELETE company — ADMIN ONLY
router.delete("/:id", auth, allowAdmin, async (req, res) => {
  try {
    await Company.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;