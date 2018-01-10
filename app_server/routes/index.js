const express = require('express');
const router = express.Router();
const ctrlLocations = require('../controllers/locations');
const ctrlOthers = require('../controllers/others');

router.get('/', ctrlOthers.angularApp);
router.get('/about', ctrlOthers.about);

module.exports = router;
