import { RequestHandler } from 'express';

export default ((req, res, next) => {
  // rudimentary check, needs improvement!
  if (!req.body.locations) {
    return res.status(400).json({ error: 'data is not in the proper format' });
  }

  next();
}) as RequestHandler;
