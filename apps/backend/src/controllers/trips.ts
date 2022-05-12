import { RequestHandler } from 'express';

import { startDate } from '../utils/time';

const getTrips = (fetchTrips: Function) =>
  (async (req, res, next) => {
    const date = startDate(req);

    if (date.toString() === 'Invalid Date') {
      return res.status(400).send('Invalid Date');
    }

    try {
      const result = await fetchTrips(date);
      return res.json(result);
    } catch (error: any) {
      if (!error.statusCode) {
        error.statusCode = 500;
      }
      return next(error);
    }
  }) as RequestHandler;

export { getTrips };
