const mongoose = require('mongoose');
const Location = mongoose.model('location');

module.exports.createReview = function (req, res) {
  res.status(200);
  res.json({status: 'success'});
};

module.exports.readReview = function (req, res) {
  if (req.params && req.params.locationId && req.params.reviewId) {
    Location
      .findById(req.params.locationId)
      .select('name reviews')
      .exec(function (err, location) {
        let response, review;

        if (!location) {
          res.status(404);
          res.json({message: 'locationId not found'});
          return;
        } else if (err) {
          res.status(404);
          res.json(err);
          return;
        }

        if (location.reviews && location.reviews.length > 0) {
          review = location.reviews.id(req.params.reviewId);

          if (!review) {
            res.status(404);
            res.json({message: 'reviewId not found'});
          } else {
            response = {
              location: {
                name: location.id,
                id: req.params.locationId
              },
              review: review
            };

            res.status(200);
            res.json(response);
          }
        } else {
          res.status(404);
          res.json({message: 'No reviews found'});
        }
      });
  } else {
    res.status(404);
    res.json({message: 'Not found; locationId and reviewId are both required'});
  }
};

module.exports.updateReview = function (req, res) {
  res.status(200);
  res.json({status: 'success'});
};

module.exports.deleteReview = function (req, res) {
  res.status(200);
  res.json({status: 'success'});
};
