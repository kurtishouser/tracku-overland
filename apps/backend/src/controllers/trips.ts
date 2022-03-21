import { RequestHandler } from 'express';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone'; // dependent on utc plugin

import * as trips from '../services/trips';

dayjs.extend(utc);
dayjs.extend(timezone);

const getTrips: RequestHandler = async (req, res, next) => {
  // disable for now
  // const timezone = req.query.tz || 'UTC';
  // const date = req.query.date
  //   ? new Date(dayjs.tz(req.query.date, timezone).format())
  //   : new Date(new Date().setHours(0, 0, 0, 0));
  const date = new Date(new Date().setHours(0, 0, 0, 0));

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
