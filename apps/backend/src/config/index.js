const env = {
  // server port
  port: process.env.TRACKU_API_PORT || 5000,
  // server subdirectory
  rootRoute: process.env.TRACKU_ROOT_ROUTE || '/',
  // MongoDB Credentials
  // mongodb://dbuser:dbpassword@]host:port/dbname
  dbUri: process.env.TRACKU_DB_URI ||
    'mongodb://overland:overland@localhost:27017/overland',
  // Socket.IO options
  ioPath: process.env.TRACKU_IO_PATH || '/socket.io',
  // required
  deviceAuthToken: process.env.TRACKU_DEVICE_AUTH_TOKEN || '1234',
};

module.exports = env;
