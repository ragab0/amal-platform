"use client";
import { useState } from "react";
import { useAppSelector } from "@/hooks/ReduxHooks";
import ChatRoom from "./chat/ChatRoom";
import ChatRoomsList from "./chat/ChatRoomsList";

export default function SupportClient() {
  const { user } = useAppSelector((state) => state.auth);
  const { room: { result: currentRoom = {} } = {} } = useAppSelector(
    (state) => state.support
  );
  const isAdmin = user?.role === "admin";
  const [showRoomList, setShowRoomList] = useState(true);

  function handleClick() {
    setShowRoomList((prev) => !prev);
  }

  if (isAdmin) {
    return (
      <div className="container mx-auto p-4">
        <div className="grid lg:grid-cols-12 gap-4">
          {/* Mobile Toggle */}
          <button
            className="lg:hidden w-full p-2 bg-main text-white rounded-lg mb-4"
            onClick={handleClick}
          >
            {showRoomList ? "رؤية المحادثة" : "الرجوع الى المحادثات"}
          </button>

          {/* Rooms List - Hidden on mobile when chat is shown */}
          {isAdmin && (
            <div
              className={`${
                showRoomList ? "block" : "hidden"
              } lg:block lg:col-span-4 rounded-lg border border-b-neutral-300 shadow`}
            >
              <ChatRoomsList />
            </div>
          )}

          {/* Chat Room - Hidden on mobile when room list is shown */}
          {Boolean([!isAdmin, isAdmin && currentRoom._id].find(Boolean)) && (
            <div
              className={`${
                showRoomList ? "hidden" : "block"
              } lg:block lg:col-span-8 rounded-lg border border-b-neutral-300 shadow`}
            >
              <ChatRoom isAdmin={true} />
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="max-w-4xl mx-auto rounded-lg border border-neutral-300 shadow">
        <ChatRoom isAdmin={false} />
      </div>
    </div>
  );
}
