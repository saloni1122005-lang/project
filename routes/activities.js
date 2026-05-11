const express = require('express');
const Activity = require('../models/Activity');

const router = express.Router();

// Search activities
router.get('/search', async (req, res) => {
  try {
    const { category, maxCost, maxDuration } = req.query;

    const activities = await Activity.search(category, maxCost, maxDuration);

    res.json({
      success: true,
      activities
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
});

// Get activities by city
router.get('/city/:cityId', async (req, res) => {
  try {
    const activities = await Activity.findByCityId(req.params.cityId);

    res.json({
      success: true,
      activities
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
});

// Get activity categories
router.get('/categories', async (req, res) => {
  try {
    const categories = await Activity.getCategories();

    res.json({
      success: true,
      categories
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
});

module.exports = router;
