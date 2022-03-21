import { RequestHandler } from 'express';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone'; // dependent on utc plugin

import * as locations from '../services/locations';

dayjs.extend(utc);
dayjs.extend(timezone);

const getLocations: RequestHandler = async (req, res, next) => {
  // disable for now
  // const timezone = req.query.tz || 'UTC';
  // const date = req.query.date
  //   ? new Date(dayjs.tz(req.query.date, timezone).format())
  //   : new Date(new Date().setHours(0, 0, 0, 0));
  const date = new Date(new Date().setHours(0, 0, 0, 0));

  try {
    const result = await locations.fetchAll(date);
    return res.status(200).json(result);
  } catch (error: any) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    return next(error);
  }
};

const createLocations: RequestHandler = async (req, res, next) => {
  try {
    await locations.addAll(req.body.locations);
    return res.status(200).json({ result: 'ok' });
  } catch (error: any) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    return next(error);
  }
};

export { getLocations, createLocations };
