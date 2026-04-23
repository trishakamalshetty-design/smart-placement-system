const express = require("express");
const Placement = require("../models/PlacementRecord");

const auth = require("../middleware/authMiddleware");
const allowAdmin = require("../middleware/allowAdmin");

const router = express.Router();

// ➕ CREATE placement — ADMIN ONLY
router.post("/", auth, allowAdmin, async (req, res) => {
  try {
    const p = await Placement.create(req.body);
    res.status(201).json(p);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 📄 GET all placements — ADMIN + VIEWER
router.get("/", auth, async (req, res) => {
  try {
    const data = await Placement.find()
      .populate("studentId")
      .populate("companyId");

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✏️ UPDATE status — ADMIN ONLY
router.put("/:id", auth, allowAdmin, async (req, res) => {
  try {
    const updated = await Placement.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ❌ DELETE placement — ADMIN ONLY
router.delete("/:id", auth, allowAdmin, async (req, res) => {
  try {
    await Placement.findByIdAndDelete(req.params.id);
    res.json({ message: "Placement deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;