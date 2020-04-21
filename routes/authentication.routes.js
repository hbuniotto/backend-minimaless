const { Router } = require('express');

const router = new Router();

const jwt = require('jsonwebtoken');

const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const passport = require('passport');
const User = require('../models/User.model');

const Validator = require('validator');

// @route   POST api/signup
// @desc    signup user
// @access  Public

router.post('/signup', (req, res ) => {
  const { email, password } = req.body; 

  if (!email || !password) {
    res.status(401).json({
      message: 'Email and password are mandatory.'
    });
    return;
  }

  if (!Validator.isEmail(email)) {
    res.status(401).json({
      message: 'Email is invalid'
    });
    return;
  }

  const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
  if (!regex.test(password)) {
    res.status(400).json({
      message:
        'Password must have at least 6 characters, a number, a lowercase and an uppercase letter.'
    });
    return;
  }

  User.findOne({ email: req.body.email })
    .then(user => {
    if (user) {
      return res.status(400).json({ message:'Email already exists' });
    } else {

      const newUser = new User({
        email: req.body.email,
        password: req.body.password
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) {
            return res.status(400).json({ message:'something is wrong' });
          }
          newUser.password = hash;

          newUser
            .save()
            .then(user => {
              const payload = { id: user.id, email: user.email };
              // Sign Token
              jwt.sign(
                payload,
                'keys.secretOrKey',
                { expiresIn: 60 * 60 * 24 }, // 24 HOURS
                (err, token) => {
                  res.json({
                    success: true,
                    token: 'Bearer ' + token 
                  });
                }
              );
            })
            .catch(err => console.log(err));
        });
      });
    }
  });
});

// @route   POST api/login
// @desc    Login User / Returning JWT Token
// @access  Public

router.post('/login', (req, res) => {

  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email }).then(user => {
    // Check for user
    if (!user) {
      return res.status(404).json({email:'User not found'});
    }

    // Check Password
    bcrypt.compare(password, user.password)
      .then(isMatch => {
      if (isMatch) {
        // User Matched
        const payload = { id: user.id, email: user.email }; // Create JWT Payload

        // Sign Token
        jwt.sign(
          payload,
          'keys.secretOrKey',
          { expiresIn: 60 * 60 * 24 }, // 24 Hours
          (err, token) => {
            res.json({
              success: true,
              token: 'Bearer ' + token
            });
          }
        );
      } else {
        return res.status(400).json({password:'Password incorrect'});
      }
    });
  });
});

// @route   GET api/isLoggedIn
// @desc    Return current user
// @access  Private

router.get(
  '/isLoggedIn',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      email: req.user.email
    });
  }
);

module.exports = router;
