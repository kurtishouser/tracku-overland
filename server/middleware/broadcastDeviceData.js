const { socketIO } = require('../config/socket');

module.exports = (req, res, next) => {
  const { locations, current, trip } = req.body;
  let currentLocation;

  if (locations) {
    currentLocation = locations[req.body.locations.length - 1];

    const tripComplete = locations.filter(location => location.properties.type === 'trip');
    if (tripComplete.length > 0) {
      socketIO('/tracker').emit('trip-complete', tripComplete);
    }
  }

  if (current) {
    currentLocation = current;
  }

  if (currentLocation) {
    socketIO('/tracker').emit('location-updated', currentLocation);
  }

  // start_location check is a rare edge case (Overland 1.2 iOS bug?)
  // if queued data is sent immediately after a trip is started the start_location object may be null
  // taking care of it here so client apps won't need check for it
  if (trip && trip.start_location) {
    socketIO('/tracker').emit('trip-active', trip);
  }

  return next();
};
