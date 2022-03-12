const mongooseLoader = require('./mongooseLoader');
const expressLoader = require('./expressLoader');

// Loader pattern
// https://softwareontheroad.com/ideal-nodejs-project-structure/
module.exports = async (app) => {
  const mongoConnection = await mongooseLoader()
    .catch((error) => {
        console.log('Error connecting to MongoDB');
        console.log(error.message);
        console.log('Exiting...');
        process.exit();
    });
  console.log('MongoDB Initialized');

  await expressLoader(app);
  console.log('Express Initialized');
};
