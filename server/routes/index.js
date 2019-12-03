const express = require('express');
const authenticateDevice = require('../middleware/authenticateDevice');
const broadcastDeviceData = require('../middleware/broadcastDeviceData');
const index = require('../controllers/index');
const Location = require('../controllers/Location');
const Trip = require('../controllers/Trip');

const router = express.Router();

router.route('/')
  .get(index);

router.route('/receiver')
  .post(
    require('../middleware/logIncomingDeviceData'), // disable for production
    authenticateDevice,
    broadcastDeviceData,
    Location.createLocations,
  );
  
router.route('/locations')
  .get(Location.getLocations);

router.route('/trips')
  .get(Trip.getTrips);

module.exports = router;
