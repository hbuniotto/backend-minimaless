// ROUTES FILE NEEDS TO BE REQUIRED IN THE APP.JS IN ORDER NOT TO GIVE 404
// APP NEEDS TO KNOW YOU CREATED A NEW ROUTE FILE, THAT'S THE ONLY WAY FOR IT TO KNOW WHICH ROUTES YOU WANT TO HIT

const express = require('express');
const userRouter = express.Router();

// ********* require user model in order to use it for CRUD *********
const user = require('../models/User.model');

// ****************************************************************************************
// POST route to create a new user in the DB
// ****************************************************************************************

// <form action="/users" method="POST">
userRouter.post('/users', (req, res, next) => { // WORKS!
  console.log(req.body);
  user.create(req.body)
    .then(userDoc => res.status(200).json(userDoc))
    .catch(err => console.log('userRouter.post error', err));
});

// ****************************************************************************************
// GET all users from the DB
// ****************************************************************************************

userRouter.get('/users', (req, res, next) => { // WORKS!
  user.find() // <-- .find() method gives us always an ARRAY back
    .then(usersFromDB => res.status(200).json({ users: usersFromDB }))
    .catch(err => next(err));
});

module.exports = userRouter;
