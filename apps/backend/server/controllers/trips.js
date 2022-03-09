const moment = require('moment-timezone');
const trips = require('../services/trips');

const getTrips = async (req, res) => {
  const timezone = req.query.tz || 'UTC';
  const date = req.query.date
  ? new Date(moment.tz(req.query.date, timezone).format())
  : new Date(new Date().setHours(0,0,0));

  try {
    const result = await trips.fetchAll(date);
    return res.json(result);
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    return next(error);
  }
};

module.exports = {
  getTrips,
};
