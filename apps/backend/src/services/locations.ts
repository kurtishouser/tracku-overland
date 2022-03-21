import Location from '../models/Location';
import { ILocations } from '../interfaces/Location';
import StatusError from '../models/StatusError';

const fetchAll = async (date: Date) => {
  const nextDay = new Date(date.getTime());
  nextDay.setDate(date.getDate() + 1);

  try {
    return await Location.find({
      'properties.timestamp': { $gte: date, $lt: nextDay },
      'properties.type': { $ne: 'trip' },
    })
      .sort({ 'properties.timestamp': 'asc' })
      .lean()
      .exec();
  } catch (err) {
    throw new StatusError(500, 'Error retrieving from database.');
  }
};

const addAll = async (locations: ILocations) => {
  try {
    return await Location.insertMany(locations);
  } catch (err) {
    throw new StatusError(500, 'Error saving to database.');
  }
};

export { fetchAll, addAll };
