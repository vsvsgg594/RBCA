import { Server } from "socket.io";

let io: Server;

export const setSocketInstance = (ioInstance: Server) => {
  io = ioInstance;
};

export const getSocketInstance = () => {
  return io;
};
