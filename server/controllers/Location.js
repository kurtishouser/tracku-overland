const Location = require('../services/Location');

const ok = { result: 'ok' }; // required response for Overland iOS app

module.exports = {
  createLocations: (req, res) => {
    if (req.body.locations) {
      Location.addAll(req.body.locations)
        .then(() => res.json(ok));
    }
  }
}
