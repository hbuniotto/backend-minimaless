// ROUTES FILE NEEDS TO BE REQUIRED IN THE APP.JS IN ORDER NOT TO GIVE 404
// APP NEEDS TO KNOW YOU CREATED A NEW ROUTE FILE, THAT'S THE ONLY WAY FOR IT TO KNOW WHICH ROUTES YOU WANT TO HIT

const express = require('express');
const router = express.Router();

// ********* require User and Listing models in order to use them *********
const User = require('../models/User.model');
const Listing = require('../models/Listing.model');

// ****************************************************************************************
// POST - create a listing
// ****************************************************************************************

// <form action="/listings" method="POST">
router.post('/listings', (req, res) => {
  // console.log(req.body);
  Listing.create(req.body)
    .then(listingDoc => res.status(200).json({ listing: listingDoc }))
    .catch(err => next(err));
});

// ****************************************************************************************
// GET route to get all the listings
// ****************************************************************************************

router.get('/listings', (req, res) => {
  Listing.find()
    .then(listingsFromDB => res.status(200).json({ listings: listingsFromDB }))
    .catch(err => next(err));
});

// ****************************************************************************************
// POST route to delete the listing
// ****************************************************************************************

// <form action="/listings/{{this._id}}/delete" method="post">
router.post('/listings/:listingId/delete', (req, res) => {
  Listing.findByIdAndRemove(req.params.listingId)
    .then(() => res.json({ message: 'Successfully removed!' }))
    .catch(err => next(err));
});

// ****************************************************************************************
// POST route to save the updates
// ****************************************************************************************

// <form action="/listings/{{foundListing._id}}/update" method="POST">
router.post('/listings/:id/update', (req, res) => {
  Listing.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(updatedListing => res.status(200).json({ listing: updatedListing }))
    .catch(err => next(err));
});

// ****************************************************************************************
// GET route for getting the listing details
// ****************************************************************************************

router.get('/listings/:someListingId', (req, res) => {
  Listing.findById(req.params.someListingId)
    .populate('user')
    .then(foundListing => res.status(200).json({ listing: foundListing }))
    .catch(err => next(err));
});

module.exports = router;
