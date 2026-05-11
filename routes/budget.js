const express = require('express');
const Budget = require('../models/Budget');
const Trip = require('../models/Trip');
const { verifyToken } = require('../middleware/auth');

const router = express.Router();

// Add expense
router.post('/:tripId', verifyToken, async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.tripId);

    if (!trip || trip.user_id !== req.userId) {
      return res.status(404).json({
        success: false,
        message: 'Trip not found'
      });
    }

    const { category, description, amount } = req.body;

    const budgetId = await Budget.addExpense(req.params.tripId, category, description, amount);

    res.status(201).json({
      success: true,
      message: 'Expense added',
      budgetId
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
});

// Get all expenses for trip
router.get('/:tripId', verifyToken, async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.tripId);

    if (!trip || trip.user_id !== req.userId) {
      return res.status(404).json({
        success: false,
        message: 'Trip not found'
      });
    }

    const expenses = await Budget.findByTripId(req.params.tripId);

    res.json({
      success: true,
      expenses
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
});

// Get budget summary
router.get('/:tripId/summary', verifyToken, async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.tripId);

    if (!trip || trip.user_id !== req.userId) {
      return res.status(404).json({
        success: false,
        message: 'Trip not found'
      });
    }

    const total = await Budget.getTotalBudget(req.params.tripId);
    const breakdown = await Budget.getBudgetBreakdown(req.params.tripId);

    res.json({
      success: true,
      total,
      breakdown,
      budgetLimit: trip.budget_limit
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
});

// Delete expense
router.delete('/:expenseId', verifyToken, async (req, res) => {
  try {
    await Budget.deleteExpense(req.params.expenseId);

    res.json({
      success: true,
      message: 'Expense deleted'
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
});

module.exports = router;
