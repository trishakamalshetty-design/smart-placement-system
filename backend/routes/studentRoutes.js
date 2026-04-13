const router = require("express").Router();
const Student = require("../models/Student");

// ADD student (now accepts placementStatus)
router.post("/", async (req, res) => {
  try {
    const student = await Student.create(req.body);
    res.status(201).json(student);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET all
router.get("/", async (req, res) => {
  const data = await Student.find();
  res.json(data);
});

// DELETE
router.delete("/:id", async (req, res) => {
  await Student.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

module.exports = router;