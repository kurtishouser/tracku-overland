let io;

module.exports = {
  initIO: (server, options) => {
    io = require('socket.io')(server, options);
    return io; 
  },
  socketIO: (namespace) => {
    if (!io) {
      throw new Error('Socket.io not initialized!');
    }
    return io.of(namespace || '/');
  },
};
