const express = require('express');
const authenticateDevice = require('../middleware/authenticateDevice');
const broadcastDeviceData = require('../middleware/broadcastDeviceData');
const index = require('../controllers/index');
const { getLocations, createLocations } = require('../controllers/locations');
const { getTrips } = require('../controllers/trips');

const router = express.Router();

router.route('/')
  .get(index);

router.route('/receiver')
  .post(
    // require('../middleware/logIncomingDeviceData'), // disable for production
    authenticateDevice,
    broadcastDeviceData,
    createLocations,
  );

router.route('/locations')
  .get(getLocations);

router.route('/trips')
  .get(getTrips);

module.exports = router;
