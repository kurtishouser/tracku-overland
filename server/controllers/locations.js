const moment = require('moment-timezone');
const locations = require('../services/locations');

const getLocations = async (req, res, next) => {
  const timezone = req.query.tz || 'UTC';
  const date = req.query.date
    ? new Date(moment.tz(req.query.date, timezone).format())
    : new Date(new Date().setHours(0,0,0));

  try {
    const result = await locations.fetchAll(date);
    return res.status(200).json(result);
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    return next(error);
  }
};

const createLocations = async (req, res, next) => {
  try {
    await locations.addAll(req.body.locations);
    return res.status(200).json({ result: 'ok' });
  } catch(error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    return next(error);
  }
};

module.exports = {
  getLocations,
  createLocations,
};
