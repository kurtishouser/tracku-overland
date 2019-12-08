const { socketIO } = require('../config/socket');
const { addLocalTimeProperties } = require('../utils/time');


module.exports = (req, res, next) => {
  const { locations, current, trip } = req.body;

  // don't mutate the locations object since it will be saved to the db
  const currentLocation = current ? current : { ...locations[locations.length - 1] };
  // the start_location checks cover some rare edge cases where the value may be null.
  // perhaps this is an issue with the Overland iOS v1.2 app (current_location exists though).
  // omitting the objects here so client apps won't need to check if it exists.
  const currentTrip = trip && trip.start_location ? trip : null;
  const completedTrips = locations.filter(
    location =>
      // maybe remove trips w/o start_location to avoid saving them to the db
      location.properties.start_location && location.properties.type === 'trip'
  );

  // edge case:
  // if the last location in the batch is a 'trip complete' object then the root
  // properties object is missing properties present in a regular location object.
  // to provide a consistent api we add them from the end_location object.
  if (currentLocation.properties.type === 'trip') {
    currentLocation.properties = {
      ...currentLocation.properties,
      motion: currentLocation.properties.end_location.properties.motion,
      speed: currentLocation.properties.end_location.properties.speed,
      altitude: currentLocation.properties.end_location.properties.altitude,
      horizontal_accuracy: currentLocation.properties.end_location.properties.horizontal_accuracy,
      vertical_accuracy: currentLocation.properties.end_location.properties.vertical_accuracy,
      battery_level: currentLocation.properties.end_location.properties.battery_level,
      battery_state: currentLocation.properties.end_location.properties.battery_state,
    };
  }

  // add local time properties based on coordinates
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

  socketIO('/tracker').emit('device-update', {
    currentLocation,
    currentTrip,
    completedTrips
  });

  return next();
};;
