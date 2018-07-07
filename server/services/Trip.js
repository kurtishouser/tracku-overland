const Location = require('../models/Location');

module.exports = {
  fetchAll: async (date) => {
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
    } catch (error) {
      throw new Error(error);
    }
  },
}
