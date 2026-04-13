const router = require("express").Router();
const Placement = require("../models/PlacementRecord");

// ➕ CREATE placement
router.post("/", async (req, res) => {
  try {
    const { studentId, companyId, status } = req.body;

    if (!studentId || !companyId) {
      return res.status(400).json({ error: "studentId and companyId required" });
    }

    const placement = await Placement.create({
      studentId,
      companyId,
      status: status || "pending"
    });

    res.status(201).json(placement);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// 📄 GET all placements (with student + company details)
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


// ✏️ UPDATE status (selected / rejected / pending)
router.put("/:id", async (req, res) => {
  try {
    const { status } = req.body;

    const updated = await Placement.findByIdAndUpdate(
      req.params.id,
      { status },
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