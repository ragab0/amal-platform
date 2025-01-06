import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  results: [],
  unreadCount: 0,
};

const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    setNotifications: (state, action) => {
      state.results = action.payload;
      state.unreadCount = action.payload.filter((n) => !n.read).length;
    },
    addNotification: (state, { payload }) => {
      state.results.unshift(payload);
      // in case we don't let user KNOW that he have a new notification lol :D
      if (!payload.read) {
        state.unreadCount += 1;
      }
    },
    markAsRead: (state, { payload }) => {
      const notification = state.results.find((n) => n._id === payload);
      if (notification && !notification.read) {
        notification.read = true;
        state.unreadCount = Math.max(0, state.unreadCount - 1);
      }
    },
    markAllAsRead: (state) => {
      state.results.forEach((notification) => {
        notification.read = true;
      });
      state.unreadCount = 0;
    },
  },
});

export const { setNotifications, addNotification, markAsRead, markAllAsRead } =
  notificationsSlice.actions;

export default notificationsSlice.reducer;
