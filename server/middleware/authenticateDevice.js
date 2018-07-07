module.exports = (req, res, next) => {
  if (!process.env.DEVICE_AUTH_TOKEN) {
    return next();
  }

  if (!req.query.token) {
    return res.status(401).json({error: 'no token provided'})
  }

  if (req.query.token === process.env.DEVICE_AUTH_TOKEN) {
    return next();
  }

  res.status(401).json({error: 'invalid token'});
}
