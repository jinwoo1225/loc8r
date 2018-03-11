const mongoose = require('mongoose');

const dbURI = `mongodb://loc8r:${process.env.MONGODB_PASSWORD}@localhost/loc8r?authSource=loc8r`;

mongoose.connect(dbURI);

mongoose.connection.on('connected', function () {
  console.log('Mongoose connected');
});

mongoose.connection.on('error', function (err) {
  console.log('Mongoose connection error: ' + err);
});

mongoose.connection.on('disconnected', function () {
  console.log('Mongoose disconnected');
});

const gracefulShutdown = function (msg, callback) {
  mongoose.connection.close(function () {
    console.log('Mongoose disconnected through ' + msg);
    callback();
  });
};

process.on('SIGINT', function () {
  gracefulShutdown('app termination', function () {
    process.exit(0);
  });
});

process.on('SIGTERM', function () {
  gracefulShutdown('Heroku app shutdown', function () {
    process.exit(0);
  });
});

require('./locations');
require('./users');
