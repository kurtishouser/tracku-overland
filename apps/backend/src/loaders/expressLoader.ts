import { Express, RequestHandler, ErrorRequestHandler, json } from 'express';

import cors from 'cors';

import { rootRoute } from '../config';
import routes from '../routes';

export default async (app: Express) => {
  app.disable('x-powered-by');
  // limit increased to accommodate 1000 points/batch
  // it was just a guess and can probably be lower
  app.use(json({ limit: '16mb' }));
  app.use(cors());

  app.use(rootRoute, routes);

  app.use(((req, res) => {
    res.sendStatus(404);
  }) as RequestHandler);

  app.use(((error, req, res, next) => {
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({ message, data });
  }) as ErrorRequestHandler);
};
