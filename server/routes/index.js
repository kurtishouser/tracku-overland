const express = require('express');
const authenticateDevice = require('../middleware/authenticateDevice');
const index = require('../controllers/index');
const Location = require('../controllers/Location');
const Trip = require('../controllers/Trip');

const router = express.Router();

router.route('/')
  .get(index);
  
router.route('/locations')
  .get(Location.getLocations)
  .post(authenticateDevice, Location.createLocations);

router.route('/trips')
  .get(Trip.getTrips);

module.exports = router;
