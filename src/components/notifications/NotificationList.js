import Link from "next/link";
import { notifications } from "@/assets/data/navbar";
import { useAppDispatch, useAppSelector } from "@/hooks/ReduxHooks";
import {
  markAsRead,
  markAllAsRead,
} from "@/store/features/notifications/notificationsSlice";

export default function NotificationList() {
  const dispatch = useAppDispatch();
  const { results = [...notifications], unreadCount } = useAppSelector(
    (state) => state.notifications
  );

  const handleMarkAsRead = (notificationId) => {
    dispatch(markAsRead(notificationId));
  };

  const handleMarkAllAsRead = () => {
    dispatch(markAllAsRead());
  };

  return (
    <div>
      <div className="flex items-center justify-between px-4 py-3 border-b">
        <h3 className="font-semibold text-gray-700">الإشعارات</h3>
        {unreadCount > 0 && (
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
            {results.slice(0, 5).map((notification) => (
              <li
                key={notification.id}
                className={`text-sm text-gray-700 hover:bg-gray-100 px-4 py-3 border-b last:border-b-0 cursor-pointer ${
                  notification.read ? "text-text" : ""
                }`}
                onClick={() => handleMarkAsRead(notification.id)}
              >
                <div className="text-sm font-medium line-clamp-2">
                  {notification.message}
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {new Date(notification.timestamp).toLocaleString("ar-SA")}
                </div>
              </li>
            ))}

            <Link
              href="/notifications"
              className="block text-center px-4 py-3 text-main hover:bg-gray-50 hover:underline border-t text-sm"
            >
              عرض كل الإشعارات
            </Link>
          </>
        )}
      </ul>
    </div>
  );
}
