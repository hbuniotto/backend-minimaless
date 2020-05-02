const express = require('express');
const router = express.Router();
const passport = require('passport');

var cloudinary = require('cloudinary');
var cloudinaryStorage = require('multer-storage-cloudinary');
var multer = require('multer');


// Load Profile Model
const Profile = require('../models/Profile');
// Load User Model
const User = require('../models/User.model');

// @route   GET api/profile/test
// @desc    Tests profile route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'Profile Works' }));

// @route   GET api/profile
// @desc    Get current users profile
// @access  Private
router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const errors = {};

    Profile.findOne({ user: req.user.id })
    //   .populate('user', ['name', 'avatar'])
      .then(profile => {
        if (!profile) {
          errors.noprofile = 'There is no profile for this user';
          return res.status(404).json(errors);
        }
        res.json(profile);
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route   POST api/profile
// @desc    Create or edit user profile
// @access  Private
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {

    // Get fields
    const profileFields = {};
    profileFields.user = req.user.id;
    profileFields.email = req.user.email;
    if (req.body.avatar) profileFields.avatar = req.body.avatar;
    if (req.body.firstName) profileFields.firstName = req.body.firstName;
    if (req.body.lastName) profileFields.lastName = req.body.lastName;
    if (req.body.phone) profileFields.phone = req.body.phone;

    // address
    profileFields.address = {};
    if (req.body.street) profileFields.address.street = req.body.street;
    if (req.body.city) profileFields.address.city = req.body.city;
    if (req.body.state) profileFields.address.state = req.body.state;
    if (req.body.zipcode) profileFields.address.zipcode = req.body.zipcode;

    Profile.findOne({ user: req.user.id }).then(profile => {
      if (profile) {
        // Update
        Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        ).then(profile => res.json(profile));
      } else {
        // Create
          // Save Profile
          new Profile(profileFields).save().then(profile => res.json(profile));
      }
    });
  }
);

// Profile image upload
// @route   POST api/profile/avatar
// @desc    profile avatar
// @access  Private

var storage = cloudinaryStorage({
  cloudinary: cloudinary,
  folder: 'profile-avatar',
  filename: function (req, file, cb) {
    cb(undefined, Date.now() + '-' + file.originalname);
  }
});
 
var parser = multer({ storage: storage });

router.post('/avatar', parser.array('images', 10), function (req, res) {
  console.log(req.files[0]);
  const { public_id, url } = req.files[0]
        res.status(200).send({
          public_id: public_id,
          url: url
      })
});

module.exports = router;
