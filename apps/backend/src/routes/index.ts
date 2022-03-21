import express from 'express';
import index from '../controllers/index';
import { getLocations, createLocations } from '../controllers/locations';
import { getTrips } from '../controllers/trips';
import authenticateDevice from '../middleware/authenticateDevice';
import broadcastDeviceData from '../middleware/broadcastDeviceData';

const router = express.Router();

router.route('/').get(index);

router.route('/receiver').post(
  // require('../middleware/logIncomingDeviceData'), // disable for production
  authenticateDevice,
  broadcastDeviceData,
  createLocations
);

router.route('/locations').get(getLocations);

router.route('/trips').get(getTrips);

export default router;
