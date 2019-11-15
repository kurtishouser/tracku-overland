let io;

module.exports = {
  init: server => {
    io = require('socket.io')(server);
    return io; 
  },
  socketIO: (namespace) => {
    if (!io) {
      throw new Error('Socket.io not initialized!');
    }
    return io.of(namespace || '/');
  },
};
