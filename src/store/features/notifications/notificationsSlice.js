import { createSlice } from "@reduxjs/toolkit";
import { getAllNotifications } from "./notificationsThunks";

const initialState = {
  results: [],
  unreadCount: 0,
  loading: false,
  error: null,
  isInitialized: false,
};

const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    addNotification: (state, action) => {
      state.results.unshift(action.payload);
      if (!action.payload.isRead) {
        state.unreadCount += 1;
      }
    },
    markAsRead: (state, action) => {
      const notification = state.results.find((n) => n._id === action.payload);
      if (notification && !notification.isRead) {
        notification.isRead = true;
        state.unreadCount = Math.max(0, state.unreadCount - 1);
      }
    },
    markAllAsRead: (state) => {
      state.results.forEach((notification) => {
        notification.isRead = true;
      });
      state.unreadCount = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllNotifications.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllNotifications.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.isInitialized = true;
        state.results = payload.results;
        state.unreadCount = payload.results.unreadCount;
      })
      .addCase(getAllNotifications.rejected, (state, { payload }) => {
        state.loading = false;
        state.isInitialized = true;
        state.error = payload?.message;
      });
  },
});

export const { addNotification, markAsRead, markAllAsRead } =
  notificationsSlice.actions;

export default notificationsSlice.reducer;
