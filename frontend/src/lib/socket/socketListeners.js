import { getSocket } from "./socketClient";
import { useNotificationStore } from "../../store/useNotificationStore";

export const initSocketListeners = () => {
  const socket = getSocket();

  if (!socket) {
    console.warn("⚠️ SOCKET NOT READY");
    return;
  }

  const addNotification =
    useNotificationStore.getState().addNotification;

  socket.off("notification");

  socket.on("notification", (data) => {
    addNotification(data);
  });
};