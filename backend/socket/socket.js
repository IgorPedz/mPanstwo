const { Server } = require("socket.io");

let io;

const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: "*",
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    const userId = socket.handshake.auth?.userId;

    if (userId) {
      const room = `user:${userId}`;

      socket.join(room);

      console.log(`🟢 User ${userId} connected (${socket.id})`);
      console.log(`📦 Joined room: ${room}`);
    } else {
      console.log(`🟢 Guest connected (${socket.id})`);
    }

    socket.on("disconnect", () => {
      console.log(`🔴 User disconnected (${socket.id})`);
    });
  });
};

const getIO = () => {
  if (!io) throw new Error("❌ Socket not initialized");
  return io;
};

module.exports = {
  initSocket,
  getIO,
};