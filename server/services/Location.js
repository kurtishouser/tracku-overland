const Location = require('../models/Location');

module.exports = {
  addAll: async (locations) => {
    try {
      return await Location.insertMany(locations);

    } catch (error) {
      throw new Error(error);
    }
  }
}
