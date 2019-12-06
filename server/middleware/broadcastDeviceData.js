const { socketIO } = require('../config/socket');

module.exports = (req, res, next) => {
  const { locations, current, trip } = req.body;

  // trip.start_location check below is a rare edge case (Overland 1.2 iOS bug?)
  // If queued data is sent from the device immediately after a trip is started
  // the start_location object may be null.
  // Ignoring it here so client apps won't need to check for it.
  if (locations) { // probably unnecessary but just in case
    socketIO('/tracker').emit('device-update', {
      currentLocation: current
        ? current
        : locations[req.body.locations.length - 1],
      currentTrip: trip && trip.start_location ? trip : null,
      completedTrips: locations.filter(
        location => location.properties.type === 'trip'
      ),
    });
  }

  return next();
};
