const express = require('express');
const crypto = require('crypto');
const Share = require('../models/Share');
const Trip = require('../models/Trip');
const Itinerary = require('../models/Itinerary');
const { verifyToken } = require('../middleware/auth');

const router = express.Router();

// Create share link
router.post('/:tripId', verifyToken, async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.tripId);

    if (!trip || trip.user_id !== req.userId) {
      return res.status(404).json({
        success: false,
        message: 'Trip not found'
      });
    }

    const token = crypto.randomBytes(32).toString('hex');
    const shareId = await Share.createShareLink(req.params.tripId, req.userId, token);

    res.status(201).json({
      success: true,
      message: 'Share link created',
      shareId,
      shareUrl: `/trip/${token}/view`,
      shareLink: `${req.protocol}://${req.get('host')}/trip/${token}/view`
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
});

// Get share links for trip
router.get('/:tripId', verifyToken, async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.tripId);

    if (!trip || trip.user_id !== req.userId) {
      return res.status(404).json({
        success: false,
        message: 'Trip not found'
      });
    }

    const links = await Share.findByTripId(req.params.tripId);

    res.json({
      success: true,
      links
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
});

// View shared trip
router.get('/view/:token', async (req, res) => {
  try {
    const share = await Share.findByToken(req.params.token);

    if (!share) {
      return res.status(404).json({
        success: false,
        message: 'Share link not found or expired'
      });
    }

    const trip = await Trip.findById(share.trip_id);
    const itinerary = await Itinerary.getItineraryWithActivities(share.trip_id);

    res.json({
      success: true,
      trip,
      itinerary,
      isReadOnly: true
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
});

// Delete share link
router.delete('/:shareId', verifyToken, async (req, res) => {
  try {
    await Share.deleteLink(req.params.shareId);

    res.json({
      success: true,
      message: 'Share link deleted'
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
});

module.exports = router;
