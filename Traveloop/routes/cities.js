const express = require('express');
const City = require('../models/City');

const router = express.Router();

// Search cities
router.get('/search', async (req, res) => {
  try {
    const { q, country } = req.query;

    if (!q) {
      return res.status(400).json({
        success: false,
        message: 'Search query is required'
      });
    }

    const cities = await City.search(q, country);

    res.json({
      success: true,
      cities
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
});

// Get popular cities
router.get('/popular', async (req, res) => {
  try {
    const cities = await City.getPopularCities(6);

    res.json({
      success: true,
      cities
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
});

// Get countries
router.get('/countries', async (req, res) => {
  try {
    const countries = await City.getCountries();

    res.json({
      success: true,
      countries
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
});

// Get city details
router.get('/:id', async (req, res) => {
  try {
    const city = await City.findById(req.params.id);

    if (!city) {
      return res.status(404).json({
        success: false,
        message: 'City not found'
      });
    }

    res.json({
      success: true,
      city
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
});

module.exports = router;
