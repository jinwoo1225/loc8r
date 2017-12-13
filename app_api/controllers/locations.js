const mongoose = require('mongoose');
const Location = mongoose.model('location');

const theEarth = (function () {
  const earthRadius = 6371; // km

  const getDistanceFromRads = function (rads) {
    return parseFloat(rads * earthRadius);
  };
  
  const getRadsFromDistance = function (distance) {
    return parseFloat(distance / earthRadius);
  };

  return {
    getDistanceFromRads: getDistanceFromRads,
    getRadsFromDistance: getRadsFromDistance
  };
})();

// allow up to seven opening times for each day of the week
const getOpeningTimes = function (body) {
  const openingTimes = [];

  for (let i = 0; i < 7; i++) {
    if (body['days' + i] && body['closed' + i]) {
      // undefined opening and closing when site is closed is not an issue
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
  const maxDistance = parseFloat(req.query.maxDistance);
  const point = {
    type: 'Point',
    coordinates: [lng, lat],
  };
  const geoOptions = {
    spherical: true,
    num: 10,
    maxDistance: theEarth.getRadsFromDistance(maxDistance)
  };

  if (!lng || !lat) {
    res.status(404);
    res.json('lng and lat query parameters are both required');
    return;
  }

  Location.geoNear(point, geoOptions, function (err, results, stats) {
    const locations = [];

    if (err) {
      res.status(404);
      res.json(err);
    } else {
      results.forEach(function (doc) {
        locations.push({
          distance: theEarth.getDistanceFromRads(doc.dis),
          name: doc.obj.name,
          address: doc.obj.address,
          rating: doc.obj.rating,
          facilities: doc.obj.facilities,
          _id: doc.obj._id
        });
      });
      
      res.status(200);
      res.json(locations);
    }
  });
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
