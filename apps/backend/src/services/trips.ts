import Location from '../models/Location';
import StatusError from '../models/StatusError';

const fetchAll = async (date: Date) => {
  const nextDay = new Date(date.getTime());
  nextDay.setDate(date.getDate() + 1);
  console.log(date, nextDay);

  try {
    return await Location.find({
      'properties.timestamp': { $gte: date, $lt: nextDay },
      'properties.type': 'trip',
    })
      .sort({ 'properties.start': 'asc' })
      .lean()
      .exec();
  } catch (err) {
    throw new StatusError(500, 'Error retrieving from database.');
  }
};

export { fetchAll };
