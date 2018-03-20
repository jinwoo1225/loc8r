const express = require('express');
const expressJwt = require('express-jwt');
const router = express.Router();
const ctrlLocations = require('../controllers/locations');
const ctrlReviews = require('../controllers/reviews');
const ctrlAuth = require('../controllers/authentication');

const auth = expressJwt({
  secret: process.env.JWT_SECRET,
  requestProperty: 'payload'
});

router.get('/locations', ctrlLocations.locationsByDistance);
router.post('/locations', ctrlLocations.createLocation);
router.get('/locations/:locationId', ctrlLocations.readLocation);
router.put('/locations/:locationId', ctrlLocations.updateLocation);
router.delete('/locations/:locationId', ctrlLocations.deleteLocation);

router.post('/locations/:locationId/reviews', auth, ctrlReviews.createReview);
router.get('/locations/:locationId/reviews/:reviewId', ctrlReviews.readReview);
router.put('/locations/:locationId/reviews/:reviewId', auth, ctrlReviews.updateReview);
router.delete('/locations/:locationId/reviews/:reviewId', auth, ctrlReviews.deleteReview);

router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);

module.exports = router;
