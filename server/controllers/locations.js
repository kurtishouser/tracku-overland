const moment = require('moment-timezone');
const locations = require('../services/locations');

const getLocations = async (req, res) => {
  const timezone = req.query.tz || 'UTC';
  const date = req.query.date
    ? new Date(moment.tz(req.query.date, timezone).format())
    : new Date(new Date().setHours(0,0,0));

  try {
    const result = await locations.fetchAll(date);
    return res.json(result);
  } catch (err) {
    return err;
  }
};

const createLocations = async (req, res) => {
  if (req.body.locations) {
    await locations.addAll(req.body.locations);
    return res.status(200).json({ result: 'ok' });
  }

  return res.status(400).json({error: 'data is not in the proper format'});
};

module.exports = {
  getLocations,
  createLocations,
};
