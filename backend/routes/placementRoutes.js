const router = require('express').Router();
const Placement = require('../models/PlacementRecord');

router.post('/', async (req, res) => {
  const p = await Placement.create(req.body);
  res.json(p);
});

router.get('/', async (req, res) => {
  const data = await Placement.find().populate('studentId companyId');
  res.json(data);
});

module.exports = router;