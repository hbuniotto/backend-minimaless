// ROUTES FILE NEEDS TO BE REQUIRED IN THE APP.JS IN ORDER NOT TO GIVE 404
// APP NEEDS TO KNOW YOU CREATED A NEW ROUTE FILE, THAT'S THE ONLY WAY FOR IT 
// TO KNOW WHICH ROUTES YOU WANT TO HIT

const express = require('express');
const router = express.Router();

// ********* require User and Booking models in order to use them *********
// const User = require('../models/User.model'); not using for now
const Booking = require('../models/Booking.model');

// ****************************************************************************************
// POST - create a booking
// ****************************************************************************************

// <form action="/bookings" method="POST">
router.post('/bookings', (req, res) => {
  // console.log(req.body);
  Booking.create(req.body)
    .then(bookingDoc => res.status(200).json({ booking: bookingDoc }))
    .catch(err => next(err));
});

// ****************************************************************************************
// GET route to get all the bookings
// ****************************************************************************************

router.get('/bookings', (req, res) => {
  Booking.find()
    .then(bookingsFromDB => res.status(200).json({ bookings: bookingsFromDB }))
    .catch(err => next(err));
});

// ****************************************************************************************
// POST route to cancel the booking
// ****************************************************************************************

// <form action="/bookings/{{this._id}}/delete" method="post">
router.post('/bookings/:bookingId/delete', (req, res) => {
  Booking.findByIdAndRemove(req.params.bookingId)
    .then(() => res.json({ message: 'Your booking has been canceled.' }))
    .catch(err => next(err));
});

// ****************************************************************************************
// POST route to save the updates
// ****************************************************************************************

// <form action="/bookings/{{foundBooking._id}}/update" method="POST">
router.post('/bookings/:id/update', (req, res) => {
  Booking.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(updatedBooking => res.status(200).json({ booking: updatedBooking }))
    .catch(err => next(err));
});

// ****************************************************************************************
// GET route for getting the booking details
// ****************************************************************************************

router.get('/bookings/:someBookingId', (req, res) => {
  Booking.findById(req.params.someBookingId)
    .populate('user')
    .then(foundBooking => res.status(200).json({ booking: foundBooking }))
    .catch(err => next(err));
});

module.exports = router;
