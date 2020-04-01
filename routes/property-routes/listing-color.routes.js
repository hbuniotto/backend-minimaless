const express = require('express');
const router = express.Router();

const ListingColor = require('../../models/listing-properties/ListingColor.model');

// ****************************************************************************************
// GET route to get all the colors
// ****************************************************************************************

router.get('/listing-color', (req, res) => {
    ListingColor.find()
      .then(listingColorsFromDB => res.status(200).json({ listingColors: listingColorsFromDB }))
      .catch(err => next(err));
  });

module.exports = router;