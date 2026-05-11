const express = require('express');
const Itinerary = require('../models/Itinerary');
const Trip = require('../models/Trip');
const { verifyToken } = require('../middleware/auth');

const router = express.Router();

// Add city to itinerary
router.post('/add-city/:tripId', verifyToken, async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.tripId);

    if (!trip || trip.user_id !== req.userId) {
      return res.status(404).json({
        success: false,
        message: 'Trip not found'
      });
    }

    const { cityId, sequenceOrder, startDate, endDate, notes } = req.body;

    const itineraryId = await Itinerary.addCity(req.params.tripId, cityId, sequenceOrder, startDate, endDate, notes);

    res.status(201).json({
      success: true,
      message: 'City added to itinerary',
      itineraryId
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
});

// Get itinerary
router.get('/:tripId', verifyToken, async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.tripId);

    if (!trip || trip.user_id !== req.userId) {
      return res.status(404).json({
        success: false,
        message: 'Trip not found'
      });
    }

    const itinerary = await Itinerary.findByTripId(req.params.tripId);

    res.json({
      success: true,
      itinerary
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
});

// Get itinerary with activities
router.get('/:tripId/with-activities', verifyToken, async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.tripId);

    if (!trip || trip.user_id !== req.userId) {
      return res.status(404).json({
        success: false,
        message: 'Trip not found'
      });
    }

    const itineraryData = await Itinerary.getItineraryWithActivities(req.params.tripId);

    res.json({
      success: true,
      itinerary: itineraryData
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
});

// Remove city from itinerary
router.delete('/:itineraryId', verifyToken, async (req, res) => {
  try {
    // Check ownership
    const itinerary = await Itinerary.findById(req.params.itineraryId);
    if (!itinerary) {
      return res.status(404).json({
        success: false,
        message: 'Itinerary not found'
      });
    }

    const trip = await Trip.findById(itinerary.trip_id);
    if (!trip || trip.user_id !== req.userId) {
      return res.status(404).json({
        success: false,
        message: 'Trip not found'
      });
    }

    await Itinerary.removeCity(req.params.itineraryId);

    res.json({
      success: true,
      message: 'City removed from itinerary'
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
});

// Update city sequence order
router.patch('/:itineraryId/sequence', verifyToken, async (req, res) => {
  try {
    // Check ownership
    const itinerary = await Itinerary.findById(req.params.itineraryId);
    if (!itinerary) {
      return res.status(404).json({
        success: false,
        message: 'Itinerary not found'
      });
    }

    const trip = await Trip.findById(itinerary.trip_id);
    if (!trip || trip.user_id !== req.userId) {
      return res.status(404).json({
        success: false,
        message: 'Trip not found'
      });
    }

    const { sequenceOrder } = req.body;

    await Itinerary.updateSequence(req.params.itineraryId, sequenceOrder);

    res.json({
      success: true,
      message: 'Sequence updated'
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
});

// Add activity to itinerary stop
router.post('/:itineraryId/activity', verifyToken, async (req, res) => {
  try {
    // Check ownership
    const itinerary = await Itinerary.findById(req.params.itineraryId);
    if (!itinerary) {
      return res.status(404).json({
        success: false,
        message: 'Itinerary not found'
      });
    }

    const trip = await Trip.findById(itinerary.trip_id);
    if (!trip || trip.user_id !== req.userId) {
      return res.status(404).json({
        success: false,
        message: 'Trip not found'
      });
    }

    const { activityId, activityDate } = req.body;

    const activityId_result = await Itinerary.addActivity(req.params.itineraryId, activityId, activityDate);

    res.status(201).json({
      success: true,
      message: 'Activity added to itinerary',
      activityId: activityId_result
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
});

// Remove activity from itinerary stop
router.delete('/:itineraryId/activity/:activityId', verifyToken, async (req, res) => {
  try {
    // Check ownership
    const itinerary = await Itinerary.findById(req.params.itineraryId);
    if (!itinerary) {
      return res.status(404).json({
        success: false,
        message: 'Itinerary not found'
      });
    }

    const trip = await Trip.findById(itinerary.trip_id);
    if (!trip || trip.user_id !== req.userId) {
      return res.status(404).json({
        success: false,
        message: 'Trip not found'
      });
    }

    await Itinerary.removeActivity(req.params.itineraryId, req.params.activityId);

    res.json({
      success: true,
      message: 'Activity removed from itinerary'
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
});

module.exports = router;
