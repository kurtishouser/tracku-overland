const Location = require('../models/location');

module.exports = async (locations) => {
  try {
    return await Location.insertMany(locations);

  } catch (error) {
    throw new Error(error);
  }
}
