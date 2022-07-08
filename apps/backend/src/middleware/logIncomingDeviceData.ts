import { RequestHandler } from 'express';

import { ILocation, ITrip } from '../interfaces/Location';

// used during development to view data sent by device
export default ((req, res, next) => {
  const {
    locations,
    current,
    trip,
  }: {
    locations: ILocation[];
    current: ILocation;
    trip: ITrip;
  } = req.body;

  console.log('---------- BATCH START----------');
  console.log('***** headers *****');
  console.log(req.headers);

  console.log('***** body *****');
  console.log(req.body);

  console.log('***** locations *****');
  locations.forEach(location => {
    if (location.properties.type === 'trip') {
      console.log('-- trip stop location --');
      console.log(location);
    } else {
      console.log('-- regular location --');
      console.log(location);
    }
  });

  if (current) {
    console.log('***** current *****');
    console.log(current);
  }

  if (trip) {
    console.log('***** trip *****');
    console.log(trip);
  }

  // simplified logging
  // if (locations) {
  //   console.log('location count', locations.length);
  //   const tripComplete = locations.filter(location => location.properties.type === 'trip');
  //   if (tripComplete.length > 0) console.log('completed trips count', tripComplete.length);
  // }

  // if (current) console.log('has current location');

  // if (trip) console.log('has trip active');

  console.log('---------- BATCH END----------');

  next();
}) as RequestHandler;
