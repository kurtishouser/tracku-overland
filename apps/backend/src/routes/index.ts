import express from 'express';
import index from '../controllers/index';
import { getLocations, createLocations } from '../controllers/locations';
import { getTrips } from '../controllers/trips';
import * as locations from '../services/locations';
import * as trips from '../services/trips';
import authenticateDevice from '../middleware/authenticateDevice';
import validateDeviceData from '../middleware/validateDeviceData';
import broadcastDeviceData from '../middleware/broadcastDeviceData';
// import logIncomingDeviceData from '../middleware/logIncomingDeviceData'; // disable for production

const router = express.Router();

router.route('/').get(index);

router.route('/receiver').post(
  // logIncomingDeviceData, // disable for production
  authenticateDevice,
  validateDeviceData,
  broadcastDeviceData,
  createLocations(locations.addAll)
);

router.route('/locations').get(
  authenticateDevice,
  getLocations(locations.fetchAll)
);

router.route('/trips').get(
  authenticateDevice,
  getTrips(trips.fetchAll)
);

export default router;
