const express = require('express');
const Note = require('../models/Note');
const Trip = require('../models/Trip');
const { verifyToken } = require('../middleware/auth');

const router = express.Router();

// Create note
router.post('/:tripId', verifyToken, async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.tripId);

    if (!trip || trip.user_id !== req.userId) {
      return res.status(404).json({
        success: false,
        message: 'Trip not found'
      });
    }

    const { itineraryId, title, content, noteDate } = req.body;

    const noteId = await Note.create(req.params.tripId, itineraryId, title, content, noteDate);

    res.status(201).json({
      success: true,
      message: 'Note created',
      noteId
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
});

// Get all notes for trip
router.get('/:tripId', verifyToken, async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.tripId);

    if (!trip || trip.user_id !== req.userId) {
      return res.status(404).json({
        success: false,
        message: 'Trip not found'
      });
    }

    const notes = await Note.findByTripId(req.params.tripId);

    res.json({
      success: true,
      notes
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
});

// Get single note
router.get('/:tripId/:noteId', verifyToken, async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.tripId);

    if (!trip || trip.user_id !== req.userId) {
      return res.status(404).json({
        success: false,
        message: 'Trip not found'
      });
    }

    const note = await Note.findById(req.params.noteId);

    if (!note) {
      return res.status(404).json({
        success: false,
        message: 'Note not found'
      });
    }

    res.json({
      success: true,
      note
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
});

// Update note
router.put('/:tripId/:noteId', verifyToken, async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.tripId);

    if (!trip || trip.user_id !== req.userId) {
      return res.status(404).json({
        success: false,
        message: 'Trip not found'
      });
    }

    const { title, content, noteDate } = req.body;

    await Note.update(req.params.noteId, title, content, noteDate);

    res.json({
      success: true,
      message: 'Note updated'
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
});

// Delete note
router.delete('/:tripId/:noteId', verifyToken, async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.tripId);

    if (!trip || trip.user_id !== req.userId) {
      return res.status(404).json({
        success: false,
        message: 'Trip not found'
      });
    }

    await Note.delete(req.params.noteId);

    res.json({
      success: true,
      message: 'Note deleted'
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
});

module.exports = router;
