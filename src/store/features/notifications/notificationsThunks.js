import { createAsyncThunk } from "@reduxjs/toolkit";
import { addNotification } from "./notificationsSlice";
import socketService from "@/services/socketService";

// Initialize socket listeners
export const initializeNotifications = createAsyncThunk(
  "notifications/initialize",
  async (_, { dispatch, getState }) => {
    const socket = socketService.connect();
    const { user } = getState().auth;

    if (user) {
      socket.on("notification", (notification) => {
        dispatch(
          addNotification({
            id: Date.now(),
            ...notification,
            read: false,
          })
        );
      });

      socket.on("chat_message", (data) => {
        if (data.sender !== user.id) {
          dispatch(
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
    }
  }
);
