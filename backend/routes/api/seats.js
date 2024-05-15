const express = require('express')
const bcrypt = require('bcryptjs');
const { check } = require('express-validator');
const { handleValidationErrors, validateQuery } = require('../../utils/validation');
const { Op } = require('sequelize')

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Event, Comment, Ticket, Seat, sequelize } = require('../../db/models');
const e = require('express');

const router = express.Router();



router.put('/:seatId/update-selection', requireAuth, async (req, res, next) => {
  const { seatId } = req.params;
  const { isSelected } = req.body;

  const seat = await Seat.findByPk(seatId);
  if (!seat) {
      const err = new Error("Seat couldn't be found");
      err.status = 404;
      return next(err);
  }

  seat.isSelected = !isSelected;
  await seat.save();
  res.json(seat);
});


router.put('/update-seats', requireAuth, async (req, res, next) => {
  const { selectedSeats } = req.body; // Ensure this matches your frontend's JSON structure

  try {
    // Handle all updates simultaneously and wait for all to complete
    const updatedSeats = await Promise.all(selectedSeats.map(async (seatId) => {
      const seat = await Seat.findByPk(seatId);
      if (!seat) {
        throw new Error(`Seat with ID ${seatId} could not be found`);
      }
      seat.status = false;
      await seat.save();
      return seat;
    }));

    res.json(updatedSeats);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update seats', details: error.message });
  }
});

module.exports = router;
