require('dotenv').config();

// const bodyParser = require('body-parser');
// const cookieParser = require('cookie-parser'); // not using cookie-parser // used token
const express = require('express');
// const passportLocal =  require ("passport-local"); // this is on the checklist for Auth Set Up for passport
const passport = require('passport');
const bodyParser = require('body-parser');

const favicon = require('serve-favicon');
// const mongoose = require('mongoose');
const connectMongo = require ("connect-mongo") // do I need this?
const logger = require('morgan');
const path = require('path');

const cors = require('cors'); // Library that allows access to the frontend
const cloudinary = require('cloudinary');

const app_name = require('./package.json').name;
const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);

const app = express();
// require database configuration

require('./configs/db.config');

// Middleware Setup
app.use(logger('dev'));
// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// app.use(cookieParser());
app.use(cors());

// make sure express- session is used before the passport
// require('./configs/session.config')(app); No longer using

// Passport middleware
app.use(passport.initialize());

// Passport Config
require('./configs/passport/passport')(passport);

app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));

// default value for title local
app.locals.title = 'Express - Generated with IronGenerator';

cloudinary.config({
  cloud_name: process.env.CLOUDE_NAME,
  api_key: process.env.CLOUDE_API_KEY,
  api_secret: process.env.CLOUDE_API_SECRET
})

// const index = require('./routes/index');
// app.use('/', index);
//      |  |  |
//      |  |  |
//      V  V  V
app.use('/api', require('./routes/index.routes'));
app.use('/api', require('./routes/user.routes'));
app.use('/api', require('./routes/listing.routes'));
app.use('/api', require('./routes/booking.routes'));
app.use('/api', require('./routes/authentication.routes'));

app.use('/api/profile', require('./routes/profile'));

// Server static assets if in production
if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'));
  
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
  }

module.exports = app;
