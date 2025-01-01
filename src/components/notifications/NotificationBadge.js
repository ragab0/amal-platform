"use client";
import DropdownMenu from "../drobDown/DropdownMenu";
import { BsBell } from "react-icons/bs";
import { useAppSelector } from "@/hooks/ReduxHooks";
import NotificationList from "./NotificationList";

export default function NotificationBadge() {
  const { unreadCount } = useAppSelector((state) => state.notifications);

  const notificationTrigger = (
    <button className="relative p-2">
      <BsBell className="text-2xl text-white" />
      {unreadCount > 0 && (
        <span className=" font-bold absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
          {unreadCount > 9 ? "+9" : unreadCount}
        </span>
      )}
    </button>
  );

  return (
    <DropdownMenu menuWrapperCls="right-0 w-80" trigger={notificationTrigger}>
      <NotificationList />
    </DropdownMenu>
  );
}
