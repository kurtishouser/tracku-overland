const moment = require('moment-timezone');
const Trip = require('../services/Trip');

const ok = { result: 'ok' }; // required response for Overland iOS app

module.exports = {
  getTrips: (req, res) => {
    const timezone = req.query.tz || 'UTC';
    const date = req.query.date
      ? new Date(moment.tz(req.query.date, timezone).format())
      : new Date(new Date().setHours(0,0,0));

    Trip.fetchAll(date)
      .then((result) => res.json(result))
  },
}
