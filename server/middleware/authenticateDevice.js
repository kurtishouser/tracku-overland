module.exports = (req, res, next) => {
  if (req.query.token === process.env.DEVICE_AUTH_TOKEN) {
    return next();
  }
  res.sendStatus(401);
}
