const express = require('express');
const Checklist = require('../models/Checklist');
const Trip = require('../models/Trip');
const { verifyToken } = require('../middleware/auth');

const router = express.Router();

// Add checklist item
router.post('/:tripId', verifyToken, async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.tripId);

    if (!trip || trip.user_id !== req.userId) {
      return res.status(404).json({
        success: false,
        message: 'Trip not found'
      });
    }

    const { itemName, category } = req.body;

    const itemId = await Checklist.addItem(req.params.tripId, itemName, category);

    res.status(201).json({
      success: true,
      message: 'Item added',
      itemId
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
});

// Get checklist items
router.get('/:tripId', verifyToken, async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.tripId);

    if (!trip || trip.user_id !== req.userId) {
      return res.status(404).json({
        success: false,
        message: 'Trip not found'
      });
    }

    const items = await Checklist.findByTripId(req.params.tripId);

    res.json({
      success: true,
      items
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
});

// Toggle item completion
router.patch('/:itemId/toggle', verifyToken, async (req, res) => {
  try {
    await Checklist.toggleItem(req.params.itemId);

    res.json({
      success: true,
      message: 'Item updated'
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
});

// Reset checklist (uncheck all items)
router.patch('/:tripId/reset', verifyToken, async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.tripId);

    if (!trip || trip.user_id !== req.userId) {
      return res.status(404).json({
        success: false,
        message: 'Trip not found'
      });
    }

    await Checklist.resetChecklist(req.params.tripId);

    res.json({
      success: true,
      message: 'Checklist reset'
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
});

// Delete item
router.delete('/:itemId', verifyToken, async (req, res) => {
  try {
    await Checklist.deleteItem(req.params.itemId);

    res.json({
      success: true,
      message: 'Item deleted'
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
});

module.exports = router;
