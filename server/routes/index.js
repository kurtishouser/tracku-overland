const express = require('express');
const index = require('../controllers/index');
const locationsController = require('../controllers/locations');

const router = express.Router();

router.route('/')
  .get(index)
  .post(locationsController);

module.exports = router;
