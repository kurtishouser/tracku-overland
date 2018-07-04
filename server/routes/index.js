const express = require('express');
const authenticateDevice = require('../middleware/authenticateDevice');
const index = require('../controllers/index');
const Location = require('../controllers/Location');

const router = express.Router();

router.route('/')
  .get(index);
  
router.route('/locations')
  .post(authenticateDevice, Location.createLocations);

module.exports = router;
