import { RequestHandler } from 'express';

import { startDate } from '../utils/time';

const getLocations = (fetchLocations: Function) =>
  (async (req, res, next) => {
    const date = startDate(req);

    if (date.toString() === 'Invalid Date') {
      return res.status(400).send('Invalid Date');
    }

    try {
      const result = await fetchLocations(date);
      return res.status(200).json(result);
    } catch (error: any) {
      if (!error.statusCode) {
        error.statusCode = 500;
      }
      return next(error);
    }
  }) as RequestHandler;

const createLocations = (addLocations: Function) =>
  (async (req, res, next) => {
    try {
      await addLocations(req.body.locations);
      return res.status(200).json({ result: 'ok' });
    } catch (error: any) {
      if (!error.statusCode) {
        error.statusCode = 500;
      }
      return next(error);
    }
  }) as RequestHandler;

export { getLocations, createLocations };
