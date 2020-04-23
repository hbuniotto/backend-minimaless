const { Router } = require('express');
const router = new Router();

const formidable = require('express-formidable');
const cloudinary = require('cloudinary');

const Listing = require('../models/Listing.model');

/// cludinary config file

cloudinary.config({
    cloud_name: 'minimaless',
    api_key: '969835716599689',
    api_secret: '_AO07i9UO2eNgWgeb0COycpuC8k'
})


// @route   GET api/listings
// @desc    Create post
// @access  Private

router.get('/listings', (req, res) => {
  Listing.find()
    .sort({ date: -1 })
    .then(lists => res.json({
      length: lists.length,
      lists
    }))
    .catch(err => res.status(404).json({ nolistsfound: 'No lists found' }));
});



// @route   POST api/listings
// @desc    Create post
// @access  Private

router.post('/listings', (req, res) => {

    const newListing = new Listing({
      title: req.body.title,
      brand: req.body.brand,
      size: req.body.size,
      condition: req.body.condition,
      category: req.body.category,
      occasion: req.body.occasion,
      color: req.body.color,
      price: req.body.price,
      images: req.body.images
    });

    newListing.save().then(list => res.json(list));
  }
);

///////////////////////////////////
//  cloudinarry 
///////////////////////////////////

router.post('/listings/uploadimage',formidable(),(req,res)=>{
  cloudinary.uploader.upload(req.files.file.path,(result)=>{
      console.log(result);
      res.status(200).send({
          public_id: result.public_id,
          url: result.url
      })
  },{
      public_id: `${Date.now()}`,
      resource_type: 'auto'
  })
})

router.get('/listings/removeimage',(req,res)=>{
  let image_id = req.query.public_id;

  cloudinary.uploader.destroy(image_id,(error,result)=>{
      if(error) return res.json({succes:false,error});
      res.status(200).send('ok');
  })
})



module.exports = router;












// // ROUTES FILE NEEDS TO BE REQUIRED IN THE APP.JS IN ORDER NOT TO GIVE 404
// // APP NEEDS TO KNOW YOU CREATED A NEW ROUTE FILE, THAT'S THE ONLY WAY FOR IT 
// // TO KNOW WHICH ROUTES YOU WANT TO HIT

// const express = require('express');
// const router = express.Router();
// const Listing = require('../models/Listing.model');
// const uploadCloud = require('../configs/cloudinary-config');

// // ********* require User and Listing models in order to use them *********
// // const User = require('../models/User.model'); not using for now

// // ****************************************************************************************
// // POST - create a listing
// // ****************************************************************************************

// {/* <form action="/listings" method="POST"> */}
// router.post('/listings', uploadCloud.single('image'), (req, res) => { // TESTED / WORKING
//   const listingInput = req.body;
//   console.log(req.file, '[][][][]');
//   listingInput.imageURL = req.file ? req.file.url : null;
  
// Listing.create(listingInput)
//     .then ((listingDoc) => { 
//       res.status(200).json(listingDoc)
//     })
//     .catch(err => res.status(400).json(err));
// });

// // router.post('/listings', (req, res) => {
// //   // console.log(req.body);
// //   Listing.create(req.body)
// //     .then(listingDoc => res.status(200).json({ listing: listingDoc }))
// //     .catch(err => next(err));
// // });

// // ****************************************************************************************
// // GET route to get all the listings
// // ****************************************************************************************

// router.get('/listings', (req, res) => { // WORKS!
//   Listing.find()
//     .then(listingsFromDB => res.status(200).json({ listings: listingsFromDB }))
//     .catch(err => next(err));
// });

// // ****************************************************************************************
// // POST route to delete the listing
// // ****************************************************************************************

// // <form action="/listings/{{this._id}}/delete" method="post">
// router.delete('/listings/:listingId/delete', (req, res) => { // WORKS! changed to .delete
//   Listing.findByIdAndRemove(req.params.listingId)
//     .then(() => res.json({ message: 'Your listing has been removed.' }))
//     .catch(err => console.log('router.post delete error', err)); // changed this to try to make it work
// });

// // ****************************************************************************************
// // POST route to save the updates
// // ****************************************************************************************

// // <form action="/listings/{{foundListing._id}}/update" method="POST">
// router.post('/listings/:id/update', (req, res) => { // WORKS!
//   Listing.findByIdAndUpdate(req.params.id, req.body, { new: true })
//     .then(updatedListing => res.status(200).json({ listing: updatedListing }))
//     .catch(err => next(err));
// });

// // ****************************************************************************************
// // GET route for getting the listing details
// // ****************************************************************************************

// router.get('/listings/:someListingId', (req, res) => { // WORKS!
//   Listing.findById(req.params.someListingId)
//     .populate('user')
//     .then(foundListing => res.status(200).json({ listing: foundListing }))
//     .catch(err => next(err));
// });

// // MISSING ROUTES TO REQUEST IMAGES

// module.exports = router;
