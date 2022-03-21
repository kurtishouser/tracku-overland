import { RequestHandler } from 'express';

export default ((_, res) => {
  res.send('TrackU API');
}) as RequestHandler;
