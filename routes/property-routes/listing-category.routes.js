const express = require('express');
const router = express.Router();

const ListingCategory = require('../../models/listing-properties/ListingCategory.model');

// ****************************************************************************************
// GET route to get all the categories
// ****************************************************************************************

router.get('/listing-category', (req, res) => {
    ListingCategory.find()
      .then(listingCategoriesFromDB => res.status(200).json({ listingCategories: listingCategoriesFromDB }))
      .catch(err => next(err));
  });

module.exports = router;