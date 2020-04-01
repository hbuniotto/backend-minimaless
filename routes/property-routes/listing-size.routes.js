const express = require('express');
const router = express.Router();

const ListingSize = require('../../models/listing-properties/ListingSize.model');

// ****************************************************************************************
// GET route to get all the sizes
// ****************************************************************************************

router.get('/listing-sizes', (req, res) => {
    ListingSize.find()
      .then(listingSizesFromDB => res.status(200).json({ listingSizes: listingSizesFromDB }))
      .catch(err => next(err));
  });

module.exports = router;