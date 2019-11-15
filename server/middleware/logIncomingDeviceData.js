// used during development to view data sent by device
module.exports = (req, res, next) => {
  console.log('***** headers *****');
  console.log(req.headers);

  console.log('***** body *****');
  console.log(req.body);

  console.log('***** locations *****');
  req.body.locations.forEach((location) => {
    if (location.properties.type === 'trip') {
      console.log('-- trip stop location --');
      console.log(location);
    } else {
      console.log('-- regular location --');
      console.log(location);
    }
  });

  if (req.body.current) {
    console.log('***** current *****');
    console.log(req.body.current);
  }

  if (req.body.trip) {
    console.log('***** trip *****');
    console.log(req.body.trip);
  }

  next();
}
