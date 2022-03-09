const { find } = require('geo-tz');
const moment = require('moment-timezone');

// accepts a location object
const addLocalTimeProperties = ({ geometry, properties }) => {
  // IANA time zone
  const localTimeZone = find(
    geometry.coordinates[1],
    geometry.coordinates[0]
  )[0]; // can be multiple, only use the first element for now
  const localTime = moment(properties.timestamp).tz(localTimeZone);

  return {
    ...properties,
    local_time_zone: localTimeZone,
    local_timestamp: moment(localTime).format(),
    local_time: moment(localTime).format('h:mm:ss a'),
    local_date: moment(localTime).format('dddd MMMM Do, YYYY')
  };
};

module.exports = {
  addLocalTimeProperties,
}
