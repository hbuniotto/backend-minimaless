// ROUTES FILE NEEDS TO BE REQUIRED IN THE APP.JS IN ORDER NOT TO GIVE 404
// APP NEEDS TO KNOW YOU CREATED A NEW ROUTE FILE, THAT'S THE ONLY WAY FOR IT TO KNOW WHICH ROUTES YOU WANT TO HIT

const express = require('express');
const ownerRouter = express.Router();

// ********* require owner model in order to use it for CRUD *********
const owner = require('../models/Owner.model');

// ****************************************************************************************
// POST route to create a new owner in the DB
// ****************************************************************************************

// <form action="/owners" method="POST">
ownerRouter.post('/owners', (req, res, next) => {
  console.log(req.body);
  owner.create(req.body)
    .then(ownerDoc => res.status(200).json(ownerDoc))
    .catch(err => next(err));
});

// ****************************************************************************************
// GET all owners from the DB
// ****************************************************************************************

ownerRouter.get('/owners', (req, res, next) => {
  owner.find() // <-- .find() method gives us always an ARRAY back
    .then(ownersFromDB => res.status(200).json({ owners: ownersFromDB }))
    .catch(err => next(err));
});

module.exports = ownerRouter;
