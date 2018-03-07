const mongoose = require('mongoose');
const Location = mongoose.model('location');

// Allow up to seven opening times for each day of the week
const getOpeningTimes = function (body) {
  const openingTimes = [];

  for (let i = 0; i < 7; i++) {
    if (body['days' + i] && body['closed' + i]) {
      // Undefined opening and closing when site is closed is not an issue
      openingTimes.push({
        days: body['days' + i],
        opening: body['opening' + i],
        closing: body['closing' + i],
        closed: body['closed' + i]
      });
    }
  }

  return openingTimes;
};

module.exports.locationsByDistance = function (req, res) {
  const lng = parseFloat(req.query.lng);
  const lat = parseFloat(req.query.lat);
  const maxDistance = parseFloat(req.query.maxDistance) * 1000; // Convert km to m
  const point = {
    type: 'Point',
    coordinates: [lng, lat],
  };

  if ((!lng && lng !== 0) || (!lat && lat !== 0)) {
    res.status(404);
    res.json('lng and lat query parameters are both required');
    return;
  }

  Location.aggregate(
    [{'$geoNear': {
      'near': point,
      'spherical': true,
      'distanceField': 'dist.calculated',
      'maxDistance': maxDistance}}],
    function(err, results) {
      const locations = [];

      if (err) {
        sendJSONresponse(res, 404, err);
      } else {
        results.forEach(function (doc) {
          locations.push({
            distance: doc.dist.calculated / 1000, // Convert m back to km
            name: doc.name,
            address: doc.address,
            rating: doc.rating,
            facilities: doc.facilities,
            _id: doc._id
          });
        });
      
        res.status(200);
        res.json(locations);
      }
    }
  );
};

module.exports.createLocation = function (req, res) {
  const openingTimes = getOpeningTimes(req.body);

  Location.create({
    name: req.body.name,
    address: req.body.address,
    facilities: req.body.facilities.split(','),
    coords: [parseFloat(req.body.lng), parseFloat(req.body.lat)],
    openingTimes: openingTimes},
    function (err, location) {
      if (err) {
        res.status(400);
        res.json(err);
      } else {
        res.status(201);
        res.json(location);
      }
    });
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
  if (!req.params.locationId) {
    res.status(404);
    res.json({message: 'Not found; locationId is required'});
    return;
  }

  Location
    .findById(req.params.locationId)
    .select('-reviews -ratings')
    .exec(function (err, location) {
      if (!location) {
        res.status(404);
        res.json({message: 'locationId not found'});
        return;
      } else if (err) {
        res.status(400);
        res.json(err);
        return;
      }

      location.name = req.body.name;
      location.address = req.body.address;
      location.facilities = req.body.facilities.split(',');
      location.coords = [parseFloat(req.body.lng), parseFloat(req.body.lat)];
      location.openingTimes = getOpeningTimes(req.body);

      location.save(function (err, location) {
        if (err) {
          res.status(404);
          res.json(err);
        } else {
          res.status(200);
          res.json(location);
        }
      });
    });
};

module.exports.deleteLocation = function (req, res) {
  const locationId = req.params.locationId;

  if (locationId) {
    Location
      .findByIdAndRemove(locationId)
      .exec(function (err, location) {
        if (err) {
          res.status(404);
          res.json(err);
          return;
        }

        res.status(204);
        res.json(null);
      });
  } else {
    res.status(404);
    res.json({message: 'No locationId'});
  }
};
