const addLocations = require('../services/addLocations');

const ok = { result: 'ok' }; // required response for Overland iOS app

module.exports = (req, res) => {
  if (req.body.locations) {
    addLocations(req.body.locations)
      .then(() => res.json(ok));
  }
}
