const router = require('express').Router();
const Placement = require('../models/PlacementRecord');

router.get('/summary', async (req, res) => {
  const data = await Placement.aggregate([
    { $match: { status: 'selected' } },
    {
      $lookup: {
        from: 'companies',
        localField: 'companyId',
        foreignField: '_id',
        as: 'company'
      }
    },
    { $unwind: '$company' },
    {
      $group: {
        _id: null,
        totalPlaced: { $sum: 1 },
        highestPackage: { $max: '$company.packageOffered' }
      }
    }
  ]);
  res.json(data);
});

module.exports = router;