const mongoose = require('mongoose');
const Location = mongoose.model('location');

module.exports.createReview = function (req, res) {
  res.status(200);
  res.json({status: 'success'});
};

module.exports.readReview = function (req, res) {
  res.status(200);
  res.json({status: 'success'});
};

module.exports.updateReview = function (req, res) {
  res.status(200);
  res.json({status: 'success'});
};

module.exports.deleteReview = function (req, res) {
  res.status(200);
  res.json({status: 'success'});
};
