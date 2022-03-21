import { Express } from 'express';

import mongooseLoader from './mongooseLoader';
import expressLoader from './expressLoader';

// Loader pattern
// https://softwareontheroad.com/ideal-nodejs-project-structure/
export default async (app: Express) => {
  const mongoose = await mongooseLoader()
    .catch(error => {
        console.log('Error connecting to MongoDB');
        console.log(error.message);
        console.log('Exiting...');
        process.exit(1);
    });
  app.set('mongoose', mongoose);
  console.log('MongoDB Initialized');

  await expressLoader(app);
  console.log('Express Initialized');
};
