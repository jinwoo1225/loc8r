const express = require('express');
const router = express.Router();
const ctrlLocations = require('../controllers/locations');
const ctrlReviews = require('../controllers/reviews');
const ctrlAuth = require('../controllers/authentication');

router.get('/locations', ctrlLocations.locationsByDistance);
router.post('/locations', ctrlLocations.createLocation);
router.get('/locations/:locationId', ctrlLocations.readLocation);
router.put('/locations/:locationId', ctrlLocations.updateLocation);
router.delete('/locations/:locationId', ctrlLocations.deleteLocation);

router.post('/locations/:locationId/reviews', ctrlReviews.createReview);
router.get('/locations/:locationId/reviews/:reviewId', ctrlReviews.readReview);
router.put('/locations/:locationId/reviews/:reviewId', ctrlReviews.updateReview);
router.delete('/locations/:locationId/reviews/:reviewId', ctrlReviews.deleteReview);

router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);

module.exports = router;
