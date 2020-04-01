const express = require('express');
const router = express.Router();

const ListingCondition = require('../../models/listing-properties/ListingCondition.model');

// ****************************************************************************************
// GET route to get all the conditionss
// ****************************************************************************************

router.get('/listing-conditions', (req, res) => {
    ListingCondition.find()
      .then(listingConditionsFromDB => res.status(200).json({ listingConditions: listingConditionsFromDB }))
      .catch(err => next(err));
  });

module.exports = router;