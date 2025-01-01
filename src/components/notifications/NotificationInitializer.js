"use client";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/ReduxHooks";
import { initializeNotifications } from "@/store/features/notifications/notificationsThunks";

export default function NotificationInitializer() {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      dispatch(initializeNotifications());
    }
  }, [dispatch, user]);

  return null;
}
