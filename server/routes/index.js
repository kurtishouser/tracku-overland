const express = require('express');
const logIncomingDeviceData = require('../middleware/logIncomingDeviceData');
const authenticateDevice = require('../middleware/authenticateDevice');
const index = require('../controllers/index');
const Location = require('../controllers/Location');
const Trip = require('../controllers/Trip');

const router = express.Router();

router.route('/')
  .get(index);

router.route('/receiver')
  .post(
    // logIncomingDeviceData, // disable for production
    authenticateDevice,
    Location.createLocations,
  );
  
router.route('/locations')
  .get(Location.getLocations);

router.route('/trips')
  .get(Trip.getTrips);

module.exports = router;
