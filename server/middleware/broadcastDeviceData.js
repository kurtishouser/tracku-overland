const { socketIO } = require('../config/socket');

module.exports = (req, res, next) => {
  if (req.body.current) {
    socketIO('/tracker').emit('location-updated', req.body.current);
  } else if (req.body.locations) {
    socketIO('/tracker').emit('location-updated', req.body.locations[req.body.locations.length - 1]);
  }

  if (req.body.trip) {
    socketIO('/tracker').emit('trip-active', req.body.trip);
  }

  return next();
};
