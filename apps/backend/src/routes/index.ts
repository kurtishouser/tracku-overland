import express from 'express';
import index from '../controllers/index';
import { getLocations, createLocations } from '../controllers/locations';
import { getTrips } from '../controllers/trips';
import * as locations from '../services/locations';
import * as trips from '../services/trips';
import authenticateDevice from '../middleware/authenticateDevice';
import broadcastDeviceData from '../middleware/broadcastDeviceData';


const router = express.Router();

router.route('/').get(index);

router.route('/receiver').post(
  // require('../middleware/logIncomingDeviceData'), // disable for production
  authenticateDevice,
  broadcastDeviceData,
  createLocations(locations.addAll)
);

router.route('/locations').get(getLocations(locations.fetchAll));

router.route('/trips').get(getTrips(trips.fetchAll));

export default router;
