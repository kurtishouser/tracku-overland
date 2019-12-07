const { socketIO } = require('../config/socket');
const { addLocalTimeProperties } = require('../utils/time');


module.exports = (req, res, next) => {
  const { locations, current, trip } = req.body;
  const currentLocation = current ? current : locations[locations.length - 1];
  // The start_location checks cover some rare edge cases where the value may be null.
  // Perhaps this is an issue with the Overland iOS v1.2 app (current_location exists).
  // Omitting the objects here so client apps won't need to check if it exists.
  const currentTrip = trip && trip.start_location ? trip : null;
  const completedTrips = locations.filter(
    location =>
      // maybe remove trips w/o start_location to avoid saving them to the db
      location.properties.start_location && location.properties.type === 'trip'
  );

  currentLocation.properties = addLocalTimeProperties(currentLocation);

  if (currentTrip) {
    currentTrip.start_location.properties = addLocalTimeProperties(
      currentTrip.start_location
    );
    currentTrip.current_location.properties = addLocalTimeProperties(
      currentTrip.current_location
    );
  }

  completedTrips.forEach(trip => {
    trip.properties.start_location.properties = addLocalTimeProperties(
      trip.properties.start_location
    );
    trip.properties.end_location.properties = addLocalTimeProperties(
      trip.properties.end_location
    );
  });

  if (locations) { // probably unnecessary but just in case
    socketIO('/tracker').emit('device-update', {
      currentLocation,
      currentTrip,
      completedTrips
    });
  }

  return next();
};;
