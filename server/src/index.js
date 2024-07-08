import express from "express";
import { Server } from "socket.io";
import cors from "cors";

const app = express();
const PORT = 5000;

// middleware
app.use(cors());

// Initialize server
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Initialize socket server
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
  },
});

io.on("connection", (client) => {
  console.log("Client Connected");

  client.on("message", (msg) => {
    console.log("Message Recived :" + msg);
    io.emit("message", msg);
  });

  client.on("disconnect", () => {
    console.log("Client Disconnect");
  });
});

// Periodic task with setInterval
setInterval(() => {
  io.emit("rtc",new Date());
  console.log("Job executed and 'rtc' emitted to all clients");
}, 5000);
