const mongoose = require('mongoose');
const Location = mongoose.model('location');

const doAddReview = function (req, res, location) {
  if (!location) {
    res.status(404);
    res.json({message: 'locationId not found'});
  } else {
    location.reviews.push({
      author: req.body.author,
      rating: req.body.rating,
      reviewText: req.body.reviewText,
    });

    location.save(function (err, location) {
      let thisReview;

      if (err) {
        res.status(400);
        res.json(err);
      } else {
        updateAverageRating(location._id);
        thisReview = location.reviews[location.reviews.length - 1];

        console.log(thisReview);

        res.status(201);
        res.json(thisReview);
      }
    });
  }
};

const updateAverageRating = function (locationId) {
  Location
    .findById(locationId)
    .select('rating reviews')
    .exec(function (err, location) {
      if (!err) {
        doSetAverageRating(location);
      }
    });
};

const doSetAverageRating = function (location) {
  if (location.reviews && location.reviews.length > 0) {
    const reviewCount = location.reviews.length;
    let ratingTotal = 0;

    for (let i = 0; i < reviewCount; i++) {
      ratingTotal += location.reviews[i].rating;
    }

    const ratingAverage = parseInt(ratingTotal / reviewCount, 10);
    location.rating = ratingAverage;

    location.save(function (err) {
      if (err) {
        console.log(err);
      } else {
        console.log('Average rating updated to', ratingAverage);
      }
    });
  }
};

module.exports.createReview = function (req, res) {
  const locationId = req.params.locationId;

  if (locationId) {
    Location
      .findById(locationId)
      .select('reviews')
      .exec(function (err, location) {
        if (err) {
          res.status(400);
          res.json(err);
        } else {
          doAddReview(req, res, location);
        }
      });
  } else {
    res.status(404);
    res.json({message: 'Not found; locationId required'});
  }
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
