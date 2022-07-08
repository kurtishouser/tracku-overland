// server port
const port = parseInt(process.env.TRACKU_API_PORT || '5000');
// server root directory
const rootRoute = process.env.TRACKU_ROOT_ROUTE || '/';
// MongoDB Credentials
// mongodb://dbuser:dbpassword@]host:port/dbname
const dbUri =
  process.env.TRACKU_DB_URI ||
  'mongodb://overland:overland@localhost:27017/overland';
// Socket.IO options
const ioPath = process.env.TRACKU_IO_PATH || '/socket.io';
// required
const deviceAuthToken = process.env.TRACKU_DEVICE_AUTH_TOKEN || 'secret';

export { port, rootRoute, dbUri, ioPath, deviceAuthToken };
