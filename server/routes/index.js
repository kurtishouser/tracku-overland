const express = require('express');
const index = require('../controllers/index');
const Location = require('../controllers/Location');

const router = express.Router();

router.route('/')
  .get(index);
  
router.route('/locations')
  .post(Location.createLocations);

module.exports = router;
