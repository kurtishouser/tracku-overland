const moment = require('moment-timezone');
const { fetchAll } = require('../services/trips');

const getTrips = async (req, res) => {
  const timezone = req.query.tz || 'UTC';
  const date = req.query.date
  ? new Date(moment.tz(req.query.date, timezone).format())
  : new Date(new Date().setHours(0,0,0));

  const result = await fetchAll(date);
  return res.json(result);
};

module.exports = {
  getTrips,
}
