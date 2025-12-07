import { io } from "socket.io-client";

const socket = io("http://localhost:3000", {
  transports: ["websocket"],
});


socket.on("connect", () => {
  console.log("Connected to server:", socket.id);


  socket.emit("client-message", "Hello Server");
});

socket.on("server-message", (data) => {
  console.log(" Message from server:", data);
});
socket.on("loginData",(data)=>{
    console.log("data", data);
})
socket.on("disconnect", () => {
  console.log(" Disconnected from server");
});
