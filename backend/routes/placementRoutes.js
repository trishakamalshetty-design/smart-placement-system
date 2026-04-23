const express = require("express");
const Placement = require("../models/PlacementRecord");

const router = express.Router();

// ➕ CREATE placement
router.post("/", async (req, res) => {
  try {
    const p = await Placement.create(req.body);
    res.status(201).json(p);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 📄 GET placements
router.get("/", async (req, res) => {
  try {
    const data = await Placement.find()
      .populate("studentId")
      .populate("companyId");

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✏️ UPDATE
router.put("/:id", async (req, res) => {
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

// ❌ DELETE
router.delete("/:id", async (req, res) => {
  try {
    await Placement.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;