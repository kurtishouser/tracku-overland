const Location = require('../models/Location');

const fetchAll = async (date) => {
  const nextDay = new Date(date.getTime());
  nextDay.setDate(date.getDate() + 1);

  try {
    return await Location
    .find()
    .where('properties.start').gte(date)
    .where('properties.start').lt(nextDay)
    .where('properties.type').eq('trip')
    .sort({'properties.start': 'asc'})
    .lean().exec();
  } catch (err) {
    const error = new Error('Error retrieving from database.');
    error.statusCode = 500;
    throw error;
  }
};

module.exports = {
  fetchAll,
};
