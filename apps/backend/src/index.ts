import express from 'express';
import { createServer } from 'http';
import { ServerOptions } from 'socket.io';

import { port, ioPath } from './config';
import { initIO } from './config/socket';
import loaders from './loaders';

(async () => {
  const app = express();
  await loaders(app);

  const httpServer = createServer(app);
  const io = initIO(httpServer, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
    },
    path: ioPath,
  } as ServerOptions);

  io.of('/tracker').on('connection', socket => {
    socket.on('connect_error', err => {
      console.log(`connect_error due to ${err.message}`);
    });

    console.log('Tracker client connected', socket.id);

    socket.on('disconnect', () =>
      console.log('Tracker client disconnected', socket.id)
    );
  });

  httpServer.listen(port, () => {
    /* eslint-disable no-console */
    console.log(`Server listening on port ${port}`);
  });

  const shutdown = (signal: string) => async () => {
    console.log(`${signal} received!`);
    console.log('Shutting down...');
    io.close();
    httpServer.close;
    await app.get('mongoose').connection.close();
    console.log('Shutdown complete. Goodbye.');
    process.exit();
  };

  process.on('SIGINT', shutdown('SIGINT'));

  process.on('SIGTERM', shutdown('SIGTERM'));
})();
