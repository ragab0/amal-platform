"use client";
import { useAppSelector, useAppDispatch } from "@/hooks/ReduxHooks";
import {
  markAsRead,
  markAllAsRead,
} from "@/store/features/notifications/notificationsSlice";

export default function NotificationList() {
  const dispatch = useAppDispatch();
  const {
    notifications = [
      {
        id: 1,
        message: "تم قبول طلب التوظيف الخاص بك",
        timestamp: new Date().toISOString(),
        read: false,
      },
      {
        id: 2,
        message: "لديك رسالة جديدة من المشرف",
        timestamp: new Date().toISOString(),
        read: true,
      },
      {
        id: 3,
        message: "تم تحديث حالة طلبك",
        timestamp: new Date().toISOString(),
        read: false,
      },
      // Add more dummy notifications here
    ],
    unreadCount = 2,
  } = {};

  const handleMarkAsRead = (notificationId) => {
    dispatch(markAsRead(notificationId));
  };

  const handleMarkAllAsRead = () => {
    dispatch(markAllAsRead());
  };

  return (
    <div className="mt-[-50px]">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow">
        <div className="flex items-center justify-between p-4 border-b">
          <h1 className="text-2xl font-semibold">الإشعارات</h1>
          {unreadCount > 0 && (
            <button
              onClick={handleMarkAllAsRead}
              className="text-main hover:underline"
            >
              تحديد الكل كمقروء
            </button>
          )}
        </div>

        <div className="divide-y">
          {notifications.length === 0 ? (
            <div className="p-8 text-center text-gray-500">لا توجد إشعارات</div>
          ) : (
            notifications.map((notification) => (
              <div
                key={notification.id}
                className={`text-sm text-gray-700 hover:bg-gray-100 px-4 py-3 cursor-pointer ${
                  !notification.read ? "bg-blue-50" : ""
                }`}
                onClick={() => handleMarkAsRead(notification.id)}
              >
                <div className="text-lg">{notification.message}</div>
                <div className="text-sm text-gray-500 mt-2">
                  {new Date(notification.timestamp).toLocaleString("ar-SA")}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
