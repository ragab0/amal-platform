"use client";
import { useState } from "react";
import { useAppSelector } from "@/hooks/ReduxHooks";
import ChatRoom from "../(main)/support/components/chat/ChatRoom";
import ChatRoomsList from "../(main)/support/components/chat/ChatRoomsList";

export default function SupportClient() {
  const { user } = useAppSelector((state) => state.auth);
  const isAdmin = user?.role === "admin";
  const [showRoomList, setShowRoomList] = useState(true);

  if (isAdmin) {
    return (
      <div className="container mx-auto p-4">
        <div className="grid lg:grid-cols-12 gap-4 h-[calc(100vh-100px)]">
          {/* Mobile Toggle */}
          <button
            className="lg:hidden w-full p-2 bg-main text-white rounded-lg mb-4"
            onClick={() => setShowRoomList(!showRoomList)}
          >
            {showRoomList ? "Show Chat" : "Show Rooms"}
          </button>

          {/* Rooms List - Hidden on mobile when chat is shown */}
          <div
            className={`${
              showRoomList ? "block" : "hidden"
            } lg:block lg:col-span-4 bg-white rounded-lg shadow`}
          >
            <ChatRoomsList />
          </div>

          {/* Chat Room - Hidden on mobile when room list is shown */}
          <div
            className={`${
              showRoomList ? "hidden" : "block"
            } lg:block lg:col-span-8 bg-white rounded-lg shadow`}
          >
            <ChatRoom isAdmin={true} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow">
        <ChatRoom isAdmin={false} />
      </div>
    </div>
  );
}
