
import { Server, Socket } from "socket.io";

export function registerSocketHandlers(io: Server) {
  
  io.on("connection", (socket: Socket) => {
    console.log("User connected:", socket.id);

    socket.on("message", (msg) => {
      console.log("Message:", msg);
      io.emit("message", msg);
    });

    socket.on("joinRoom", (roomName) => {
      socket.join(roomName);
      console.log(`${socket.id} joined room ${roomName}`);
    });

    socket.on("typing", () => {
      socket.broadcast.emit("typing", `${socket.id} is typing...`);
    });

    socket.on("disconnect", (reason) => {
      console.log("User disconnected:", socket.id, "Reason:", reason);
    });
  });
}
