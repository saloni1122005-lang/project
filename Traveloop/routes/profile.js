const express = require('express');
const User = require('../models/User');
const { verifyToken } = require('../middleware/auth');

const router = express.Router();

// Get profile
router.get('/', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.userId);

    res.json({
      success: true,
      user
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
});

// Update profile
router.put('/', verifyToken, async (req, res) => {
  try {
    const { name, profilePhoto } = req.body;

    await User.update(req.userId, name, profilePhoto);

    res.json({
      success: true,
      message: 'Profile updated successfully'
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
});

// Delete account
router.delete('/', verifyToken, async (req, res) => {
  try {
    await User.delete(req.userId);

    res.json({
      success: true,
      message: 'Account deleted successfully'
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
});

module.exports = router;
