"use client";
import Link from "next/link";
import socketService from "@/services/socketService";
import { notifications } from "@/assets/data/navbar";
import { useAppSelector } from "@/hooks/ReduxHooks";

export default function NotificationList({
  isPage = false,
  hideReadAll = false,
}) {
  const { results = [...notifications], unreadCount } = useAppSelector(
    (state) => state.notifications
  );

  const handleMarkAsRead = (notificationId, isRead) => {
    if (!isRead) {
      socketService.socket?.emit("mark_notification_read", { notificationId });
    }
  };

  const handleMarkAllAsRead = () => {
    if (unreadCount > 0) {
      socketService.socket?.emit("mark_all_notifications_read");
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between px-4 py-3 border-b">
        {!isPage && <h3 className="font-semibold text-gray-700">الإشعارات</h3>}
        {unreadCount > 0 && !hideReadAll && (
          <button
            onClick={handleMarkAllAsRead}
            className="text-sm text-main hover:underline"
          >
            تحديد الكل كمقروء
          </button>
        )}
      </div>
      <ul className="max-h-[400px] overflow-y-auto ">
        {results.length === 0 ? (
          <li className="text-sm text-gray-700 hover:bg-gray-100 px-4 py-3 text-center">
            لا توجد إشعارات
          </li>
        ) : (
          <>
            {results.slice(0, isPage ? undefined : 5).map((notification) => (
              <li
                key={notification._id}
                className={`text-sm text-gray-700 hover:bg-gray-100 px-4 py-3 border-b last:border-b-0 cursor-pointer ${
                  notification.read ? "text-text" : ""
                }`}
                onClick={() =>
                  handleMarkAsRead(notification._id, notification.read)
                }
              >
                <div className="text-sm font-medium line-clamp-2">
                  {notification.text}
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {new Date(notification.createdAt).toLocaleString("ar-EG")}
                </div>
              </li>
            ))}
            {!isPage && (
              <Link
                href="/notifications"
                className="block text-center px-4 py-3 text-main hover:bg-gray-50 hover:underline border-t text-sm"
              >
                عرض كل الإشعارات
              </Link>
            )}
          </>
        )}
      </ul>
    </div>
  );
}
