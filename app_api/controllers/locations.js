const mongoose = require('mongoose');
const Location = mongoose.model('location');

module.exports.locationsByDistance = function (req, res) {
  res.status(200);
  res.json({status: 'success'});
};

module.exports.createLocation = function (req, res) {
  res.status(200);
  res.json({status: 'success'});
};

module.exports.readLocation = function (req, res) {
  Location
    .findById(req.params.locationId)
    .exec(function (err, location) {
      if (!location) {
        res.status(404);
        res.json({message: 'locationId not found'});
      } else if (err) {
        res.status(404);
        res.json(err);
      } else {
        res.status(200);
        res.json(location);
      }
    });
};

module.exports.updateLocation = function (req, res) {
  res.status(200);
  res.json({status: 'success'});
};

module.exports.deleteLocation = function (req, res) {
  res.status(200);
  res.json({status: 'success'});
};
