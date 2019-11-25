const env = {
  // server port
  port: process.env.TRACKU_API_PORT,
  // server subdirectory
  rootRoute: process.env.TRACKU_ROOT_ROUTE,
  // MongoDB Credentials -> [dbuser:dbpassword@]host:port/dbname
  dbUser: process.env.TRACKU_DB_USER,
  dbPassword: process.env.TRACKU_DB_PASSWORD,
  dbHost: process.env.TRACKU_DB_HOST,
  dbPort: process.env.TRACKU_DB_PORT,
  dbName: process.env.TRACKU_DB_NAME,
  // socket.io options
  ioPath: process.env.TRACKU_IO_PATH,
  // required
  deviceAuthToken: process.env.TRACKU_DEVICE_AUTH_TOKEN,
};

module.exports = env;