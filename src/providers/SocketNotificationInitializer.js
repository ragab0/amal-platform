"use client";
import socketService from "@/services/socketService";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/ReduxHooks";
import {
  setNotifications,
  addNotification,
  markAsRead,
  markAllAsRead,
} from "@/store/features/notifications/notificationsSlice";

export default function SocketNotificationInitializer() {
  const dispatch = useAppDispatch();
  const {
    user: { _id },
  } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (!_id) return;
    const socket = socketService.connect();
    socket.emit("get_notifications");

    // Handle notifications list updates
    socket.on("notifications_updated", (notifications) => {
      dispatch(setNotifications(notifications));
    });

    // Handle new notifications
    socket.on("new_notification", (notification) => {
      if (notification.recipient._id === _id) {
        dispatch(addNotification(notification));
      }
    });

    // Handle notification read status updates
    socket.on("notification_marked_read", (notification) => {
      dispatch(markAsRead(notification._id));
    });

    // Handle all notifications marked as read
    socket.on("all_notifications_marked_read", () => {
      dispatch(markAllAsRead());
    });

    return () => {
      socket.off("notifications_updated");
      socket.off("new_notification");
      socket.off("notification_marked_read");
      socket.off("all_notifications_marked_read");
      socketService.disconnect();
    };
  }, [dispatch, _id]);

  return null;
}
