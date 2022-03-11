const { deviceAuthToken } = require ('../config/env.js');

module.exports = (req, res, next) => {
  if (!deviceAuthToken) { // no auth token configured, skip authentication
    return next();
  }

  if (!req.query.authToken) {
    return res.status(401).json({error: 'no token provided'})
  }

  if (req.query.authToken === deviceAuthToken) {
    return next();
  }

  res.status(401).json({error: 'invalid token'});
}
