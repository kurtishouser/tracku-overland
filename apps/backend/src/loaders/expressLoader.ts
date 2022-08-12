import { Express, RequestHandler, ErrorRequestHandler, json } from 'express';

import cors from 'cors';

import { rootRoute } from '../config';
import routes from '../routes';

export default async (app: Express) => {
  app.disable('x-powered-by');
  // increase limit to accommodate 1000 locations/batch
  // ~600 bytes/location per Overland documentation
  // so make it 1000kb to be safe
  app.use(json({ limit: '1000kb' }));
  app.use(cors());

  //app.use((req, res, next) => {
  //  console.log(req.method, req.url);
  //  console.log(JSON.stringify(req.headers, null, 2));
  //  next();
  //});

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
