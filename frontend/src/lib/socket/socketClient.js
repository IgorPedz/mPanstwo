import { io } from "socket.io-client";

let socket;

export const initSocket = (userId) => {
  if (!userId) return null;

  socket = io("http://localhost:5000", {
    auth: { userId },
    transports: ["websocket"],
  });

  return socket;
};

export const getSocket = () => socket;