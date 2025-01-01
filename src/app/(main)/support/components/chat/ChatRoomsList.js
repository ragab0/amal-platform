"use client";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/ReduxHooks";
import { fetchRooms } from "@/store/features/chat/chatThunks";
import { setCurrentRoom } from "@/store/features/chat/chatSlice";

const ChatRoomsList = () => {
  const dispatch = useAppDispatch();
  const { rooms, currentRoom, loading } = useAppSelector((state) => state.chat);

  useEffect(() => {
    dispatch(fetchRooms());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-main"></div>
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto">
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-4">Active Chats</h2>
        <div className="space-y-2">
          {rooms.map((room) => (
            <button
              key={room.id}
              onClick={() => dispatch(setCurrentRoom(room.id))}
              className={`w-full p-4 rounded-lg transition-colors ${
                currentRoom === room.id
                  ? "bg-main text-white"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              <div className="flex justify-between items-center">
                <span className="font-medium">{room.name}</span>
                {room.unread > 0 && (
                  <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                    {room.unread}
                  </span>
                )}
              </div>
              <p className="text-sm truncate mt-1">
                {room.lastMessage}
              </p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChatRoomsList;
