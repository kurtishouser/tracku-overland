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
  } catch (err) {
    const error = new Error('Error retrieving from database.');
    error.statusCode = 500;
    throw error;
  }
};

const addAll = async (locations) => {
  try {
    return await Location.insertMany(locations);
  } catch (err) {
    const error = new Error('Error saving to database.');
    error.statusCode = 500;
    throw error;
  }
};

module.exports = {
  fetchAll,
  addAll,
};
