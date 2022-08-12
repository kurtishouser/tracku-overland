import { RequestHandler } from 'express';

import { deviceAuthToken } from '../config';

export default ((req, res, next) => {
  console.log('authenticateDevice()');

  if (!req.query.authToken) {
    return res.status(401).json({ error: 'no token provided' });
  }

  if (req.query.authToken === deviceAuthToken) {
    return next();
  }

  res.status(401).json({ error: 'invalid token' });
}) as RequestHandler;
