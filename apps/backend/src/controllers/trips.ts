import { RequestHandler } from 'express';

import { startDate } from '../utils/time';
import * as trips from '../services/trips';

const getTrips: RequestHandler = async (req, res, next) => {
  const date = startDate(req);

  if (date.toString() === 'Invalid Date') {
    return res.status(400).send('Invalid Date');
  }

  try {
    const result = await trips.fetchAll(date);
    return res.json(result);
  } catch (error: any) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    return next(error);
  }
};

export { getTrips };
