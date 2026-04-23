const express = require("express");
const Student = require("../models/Student");

const auth = require("../middleware/authMiddleware");
const allowAdmin = require("../middleware/allowAdmin");

const router = express.Router();

// ➕ ADD student — ADMIN ONLY
router.post("/", auth, allowAdmin, async (req, res) => {
  try {
    const student = await Student.create(req.body);
    res.status(201).json(student);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 📄 GET all students — ADMIN + VIEWER
router.get("/", async (req, res) => {
  try {
    const data = await Student.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ❌ DELETE student — ADMIN ONLY
router.delete("/:id", auth, allowAdmin, async (req, res) => {
  try {
    await Student.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;