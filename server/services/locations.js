const Location = require('../models/Location');

const fetchAll = async (date) => {
  const nextDay = new Date(date.getTime());
  nextDay.setDate(date.getDate() + 1);
  try {
    return await Location
      .find()
      .where('properties.timestamp').gte(date)
      .where('properties.timestamp').lt(nextDay)
      .where('properties.type').ne('trip')
      .sort({'properties.timestamp': 'asc'})
      .lean().exec();
  } catch (error) {
    throw new Error(error);
  }
};

const addAll = async (locations) => {
  try {
    return await Location.insertMany(locations);
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  fetchAll,
  addAll,
};
