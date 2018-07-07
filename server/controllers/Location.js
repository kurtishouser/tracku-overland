const moment = require('moment-timezone');
const Location = require('../services/Location');

const ok = { result: 'ok' }; // required response for Overland iOS app

module.exports = {
  getLocations: (req, res) => {
    const timezone = req.query.tz || 'UTC';
    const date = req.query.date
      ? new Date(moment.tz(req.query.date, timezone).format())
      : new Date(new Date().setHours(0,0,0));

    Location.fetchAll(date)
      .then((result) => res.json(result))
  },

  createLocations: (req, res) => {
    if (req.body.locations) {
      Location.addAll(req.body.locations)
        .then(() => res.json(ok));
    }
  }
}
