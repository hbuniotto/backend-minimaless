require('dotenv').config();

// const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require('express');
const passportLocal =  require ("passport-local"); // this is on the checklist for Auth Set Up for passport
const favicon = require('serve-favicon');
// const mongoose = require('mongoose');
const connectMongo = require ("connect-mongo") // do I need this?
const logger = require('morgan');
const path = require('path');

const app_name = require('./package.json').name;
const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);

const app = express();
// require database configuration

require('./configs/db.config');

// Middleware Setup
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// make sure express- session is used before the passport
require('./configs/session.config')(app);

require('./configs/passport/passport.config.js')(app);

app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));

// default value for title local
app.locals.title = 'Express - Generated with IronGenerator';

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

module.exports = app;
