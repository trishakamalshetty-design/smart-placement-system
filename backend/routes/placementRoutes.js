const express = require("express");
const Placement = require("../models/PlacementRecord");

const router = express.Router();

// ➕ CREATE placement
router.post("/", async (req, res) => {
  try {
    console.log("BODY RECEIVED:", req.body); // 👈 add this

    const p = await Placement.create(req.body);
    res.status(201).json(p);
  } catch (err) {
    console.error(err); // 👈 add this
    res.status(500).json({ error: err.message });
  }
});
// 📄 GET all placements
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

// ✏️ UPDATE status
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

// ❌ DELETE placement
router.delete("/:id", async (req, res) => {
  try {
    await Placement.findByIdAndDelete(req.params.id);
    res.json({ message: "Placement deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;