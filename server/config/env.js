const env = {
  //server port
  port: process.env.TRACKU_PORT || 5000,
  // MongoDB Credentials -> [dbuser:dbpassword@]host:port/dbname
  dbUser: process.env.TRACKU_DB_USER,
  dbPassword: process.env.TRACKU_DB_PASSWORD,
  dbHost: process.env.TRACKU_DB_HOST,
  dbPort: process.env.TRACKU_DB_PORT,
  dbName: process.env.TRACKU_DB_NAME,
  // required, change to something else and add to url on iOS app
  deviceAuthToken: process.env.TRACKU_DEVICE_AUTH_TOKEN,
};

module.exports = env;