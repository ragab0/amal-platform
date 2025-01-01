import socketService from "@/services/socketService";
import { addNotification } from "./notificationsSlice";

export const notificationsMiddleware = (store) => (next) => (action) => {
  const result = next(action);

  // Listen for socket events when auth state changes
  if (action.type === "auth/setUser") {
    const user = action.payload;
    
    if (user) {
      const socket = socketService.connect();

      socket.on("notification", (notification) => {
        store.dispatch(
          addNotification({
            id: Date.now(),
            ...notification,
            read: false,
          })
        );
      });

      socket.on("chat_message", (data) => {
        if (data.sender !== user.id) {
          store.dispatch(
            addNotification({
              id: Date.now(),
              type: "chat",
              message: `رسالة جديدة من ${data.senderName}`,
              data: data,
              timestamp: new Date().toISOString(),
              read: false,
            })
          );
        }
      });
    } else {
      // Clean up listeners when user logs out
      socketService.removeAllListeners("notification");
      socketService.removeAllListeners("chat_message");
    }
  }

  return result;
};
