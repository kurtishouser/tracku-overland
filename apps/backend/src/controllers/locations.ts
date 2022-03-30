import { RequestHandler } from 'express';

import { startDate } from '../utils/time';
import * as locations from '../services/locations';

const getLocations: RequestHandler = async (req, res, next) => {
  const date = startDate(req);

  if (date.toString() === 'Invalid Date') {
    return res.status(400).send('Invalid Date');
  }

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
