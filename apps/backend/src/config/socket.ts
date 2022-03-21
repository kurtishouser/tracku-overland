import { Server as httpServer } from 'http';
import { Server, ServerOptions } from 'socket.io';
import { ILocation, ITrip } from '../interfaces/Location';

interface SocketData {
  currentLocation: ILocation;
  currentTrip: ITrip;
  completedTrips: ILocation[];
}

let io: Server;

const initIO = (server: httpServer, options: ServerOptions) => {
  io = new Server<SocketData>(server, options);

  return io;
};

const socketIO = (namespace: string) => {
  if (!io) {
    throw new Error('Socket.io not initialized!');
  }

  return io.of(namespace || '/');
};

export { initIO, socketIO };
