"use client";
import YoungCircleLoader from "@/components/loaders/YoungCircleLoader";
import socketService from "@/services/socketService";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/ReduxHooks";
import {
  setCurrentRoomId,
  setRoomsLastMsg,
  setRooms,
} from "@/store/features/support/supportSlice";

export default function ChatRoomsList() {
  const dispatch = useAppDispatch();
  const {
    allRooms: { list: rooms = [], loading },
    room: { result: currentRoom = {} },
  } = useAppSelector((state) => state.support);

  useEffect(() => {
    const socket = socketService.connect();
    socket.emit("get_room_list");
    socket.on("room_list_updated", function (list) {
      dispatch(setRooms(list));
    });
    socket.on("rooms_last_msg_updated", function (updatedMsg) {
      dispatch(setRoomsLastMsg(updatedMsg));
    });

    // Cleanup listeners on unmount
    return () => {
      socket.off("rooms_last_msg_updated");
    };
  }, [dispatch]);

  const handleRoomChange = (roomId) => {
    if (roomId === currentRoom?._id) return;
    dispatch(setCurrentRoomId({ roomId }));
  };

  if (loading) {
    return <YoungCircleLoader isHFull={true} className="py-8" />;
  }

  return (
    <div className="h-full overflow-y-auto">
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-4">المحادثات</h2>
        <div className="space-y-2">
          {rooms.map((room) => (
            <button
              key={room._id}
              onClick={() => handleRoomChange(room._id)}
              className={`w-full p-4 rounded-lg transition-colors ${
                currentRoom?._id === room._id
                  ? "bg-main text-white"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              <div className="flex items-center justify-between">
                <span>{`${room.user?.fname} ${room.user?.lname} | ${room.user?.email}`}</span>

                {/* {room.unreadCount > 0 && (
                  <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs">
                    {room.unreadCount}
                  </span>
                )} */}
              </div>
              {room.lastMessage && (
                <p className="text-sm text-gray-500 truncate mt-1">
                  {room.lastMessage.text?.slice(0, 50)}
                </p>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
