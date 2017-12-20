const express = require('express');
const router = express.Router();
const ctrlLocations = require('../controllers/locations');
const ctrlOthers = require('../controllers/others');

// Locations pages
router.get('/', ctrlLocations.homeList);
router.get('/location/:locationId', ctrlLocations.locationInfo);
router.get('/location/:locationId/reviews/new', ctrlLocations.addReviewGet);
router.post('/location/:locationId/reviews/new', ctrlLocations.addReviewPost);

// Other pages
router.get('/about', ctrlOthers.about);

module.exports = router;
