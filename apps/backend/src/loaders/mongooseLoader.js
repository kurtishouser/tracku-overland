const mongoose = require('mongoose');

const { dbUri } = require ('../config');

module.exports = async () => {
  // MongoDB access control must be enabled (mongod --auth)
  const connection = await mongoose.connect(dbUri, {useNewUrlParser: true, useUnifiedTopology: true});
  return connection;
};
