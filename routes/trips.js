const express = require('express');
const Trip = require('../models/Trip');
const { verifyToken } = require('../middleware/auth');

const router = express.Router();

// Create trip
router.post('/', verifyToken, async (req, res) => {
  try {
    const { name, description, startDate, endDate, image, budgetLimit } = req.body;

    if (!name || !startDate || !endDate) {
      return res.status(400).json({
        success: false,
        message: 'Trip name, start date, and end date are required'
      });
    }

    const tripId = await Trip.create(req.userId, name, description, startDate, endDate, image, budgetLimit);

    res.status(201).json({
      success: true,
      message: 'Trip created successfully',
      tripId
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
});

// Get all trips for user
router.get('/', verifyToken, async (req, res) => {
  try {
    const trips = await Trip.findByUserId(req.userId);

    // Get destination count for each trip
    for (let trip of trips) {
      trip.destinationCount = await Trip.getDestinationCount(trip.id);
    }

    res.json({
      success: true,
      trips
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
});

// Get single trip
router.get('/:id', verifyToken, async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id);

    if (!trip || trip.user_id !== req.userId) {
      return res.status(404).json({
        success: false,
        message: 'Trip not found'
      });
    }

    trip.destinationCount = await Trip.getDestinationCount(trip.id);
    res.json({
      success: true,
      trip
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
});

// Update trip
router.put('/:id', verifyToken, async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id);

    if (!trip || trip.user_id !== req.userId) {
      return res.status(404).json({
        success: false,
        message: 'Trip not found'
      });
    }

    const { name, description, startDate, endDate, budgetLimit } = req.body;
    await Trip.update(req.params.id, name, description, startDate, endDate, budgetLimit);

    res.json({
      success: true,
      message: 'Trip updated successfully'
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
});

// Delete trip
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id);

    if (!trip || trip.user_id !== req.userId) {
      return res.status(404).json({
        success: false,
        message: 'Trip not found'
      });
    }

    await Trip.delete(req.params.id);

    res.json({
      success: true,
      message: 'Trip deleted successfully'
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
});

// Get recent trips
router.get('/recent/trips', verifyToken, async (req, res) => {
  try {
    const trips = await Trip.getRecentTrips(req.userId);
    res.json({
      success: true,
      trips
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
});

module.exports = router;
