"use client";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/ReduxHooks";
import { getAllNotifications } from "@/store/features/notifications/notificationsThunks";
import { addNotification } from "@/store/features/notifications/notificationsSlice";
import socketService from "@/services/socketService";

export default function SocketNotificationInitializer() {
  const dispatch = useAppDispatch();
  const {
    user: { _id },
  } = useAppSelector((state) => state.auth);

  // Initialize socket and fetch notifications when user changes && REconnect too
  useEffect(() => {
    if (_id) {
      dispatch(getAllNotifications());
      socketService.connect();
      socketService.socket.on("notification", (notification) => {
        dispatch(addNotification(notification));
      });
      return () => {
        socketService.socket.removeListener("notification");
        socketService.disconnect();
      };
    }
  }, [dispatch, _id]);

  return null;
}
