require('dotenv').load();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require('express');
const favicon = require('static-favicon');
const fs = require('fs');
const logger = require('morgan');
const passport = require('passport');
const path = require('path');
const uglifyJs = require('uglify-js');

// These can't be in alphabetical order
require('./app_api/models/db');
require('./app_api/config/passport');

const routes = require('./app_server/routes/index');
const routesApi = require('./app_api/routes/index');
const users = require('./app_server/routes/users');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'app_server', 'views'));
app.set('view engine', 'pug');

const appClientFiles = [
  'app_client/loc8r-spa.js',
  'app_client/home/home.controller.js',
  'app_client/about/about.controller.js',
  'app_client/locationDetail/locationDetail.controller.js',
  'app_client/reviewModal/reviewModal.controller.js',
  'app_client/common/services/geolocation.service.js',
  'app_client/common/services/loc8rData.service.js',
  'app_client/common/filters/formatDistance.filter.js',
  'app_client/common/filters/addHtmlLineBreaks.filter.js',
  'app_client/common/directives/ratingStars/ratingStars.directive.js',
  'app_client/common/directives/footerGeneric/footerGeneric.directive.js',
  'app_client/common/directives/navigation/navigation.directive.js',
  'app_client/common/directives/pageHeader/pageHeader.directive.js'
];

const appClientCode = {};

for (let file of appClientFiles) {
  appClientCode[file] = fs.readFileSync(file, 'utf8');
}

const uglified = uglifyJs.minify(appClientCode, {compress: false});

fs.writeFile('public/angularjs/loc8r-spa.min.js', uglified.code, function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log('Script saved and generated: loc8r-spa.min.js');
  }
});

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'app_client')));
app.use(passport.initialize());

// app.use('/', routes);
app.use('/api', routesApi);
app.use('/users', users);

app.use(function(req, res) {
  res.sendFile(path.join(__dirname, 'app_client', 'index.html'));
});

/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

// unauthorized error handler
app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401);
    res.json({message: `${err.name}: ${err.message}`});
  }
});

module.exports = app;
