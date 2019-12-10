const moment = require('moment-timezone');
const { fetchAll, addAll } = require('../services/locations');

const ok = { result: 'ok' }; // required response for Overland iOS app

const getLocations = async (req, res) => {
  const timezone = req.query.tz || 'UTC';
  const date = req.query.date
    ? new Date(moment.tz(req.query.date, timezone).format())
    : new Date(new Date().setHours(0,0,0));

  const result = await fetchAll(date);
  return res.json(result);
};

const createLocations = async (req, res) => {
  if (req.body.locations) {
    await addAll(req.body.locations);
    return res.json(ok);
  }

  return res.status(400).json({error: 'data is not in the proper format'});
};

module.exports = {
  getLocations,
  createLocations,
};
