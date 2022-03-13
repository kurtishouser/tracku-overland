const express = require('express');

const { port, ioPath } = require ('./config');
const loaders = require('./loaders');
const { initIO } = require('./config/socket');

(async () => {
    const app = express();
    await loaders(app);

    const server = app.listen(port, () => {
      /* eslint-disable no-console */
      console.log(`Server listening on port ${port}`);
    }); 

    const io = initIO(server, {
      cors: {
        origin: '*',
      },
      path: ioPath,
    });
    io.of('/tracker').on('connection', socket => {
      console.log('Tracker client connected', socket.id);

      socket.on('disconnect', () => console.log('Tracker client disconnected', socket.id));
    });

    process.on('SIGINT', () => {
      console.log('Shutting down...');
      io.close();
      server.close(() => {
        app.get('mongoose').connection.close()
          .then(() => {
            console.log('Shutdown complete. Goodbye.');
            process.exit();
        });
      });
    });
})();
