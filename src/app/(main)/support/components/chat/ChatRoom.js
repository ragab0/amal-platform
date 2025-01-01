"use client";
import { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/ReduxHooks";
import { addMessage } from "@/store/features/chat/chatSlice";
import { BsEmojiSmile, BsPaperclip, BsSend } from "react-icons/bs";
import { useForm } from "react-hook-form";
import socketService from "@/services/socketService";

const ChatRoom = ({ isAdmin = false }) => {
  const messagesEndRef = useRef(null);
  const dispatch = useAppDispatch();
  const {
    currentRoom = {},
    messages,
    isTyping,
  } = useAppSelector((state) => state.chat);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    // Connect to socket when component mounts
    const socket = socketService.connect();

    // Set up event listeners
    socket.on("message_received", (data) => {
      dispatch(addMessage({ roomId: data.roomId, message: data.message }));
    });

    socket.on("typing_status", (data) => {
      // Handle typing status
      console.log("Typing status:", data);
    });

    // Join room if we have a current room
    if (currentRoom?.id) {
      socketService.joinRoom(currentRoom.id);
    }

    // Cleanup function
    return () => {
      if (currentRoom?.id) {
        socketService.leaveRoom(currentRoom.id);
      }
      socketService.removeAllListeners("message_received");
      socketService.removeAllListeners("typing_status");
    };
  }, [currentRoom?.id, dispatch]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const onSubmit = (data) => {
    if (!data.message.trim()) return;

    const newMessage = {
      id: Date.now(),
      text: data.message,
      sender: isAdmin ? "admin" : "user",
      timestamp: new Date().toISOString(),
    };

    // Send message through socket
    socketService.sendMessage(currentRoom?.id, newMessage);

    // Optimistically add message to UI
    dispatch(addMessage({ roomId: currentRoom?.id, message: newMessage }));
    reset();
  };

  const renderMessages = () => {
    const roomMessages = messages[currentRoom?.id] || [];
    let lastDate = null;

    return roomMessages.map((message) => {
      const date = new Date(message.timestamp);
      const showDate = !lastDate || !isSameDay(lastDate, date);
      lastDate = date;

      return (
        <div key={message.id}>
          {showDate && (
            <div className="flex items-center justify-center my-4">
              <div className="px-4 py-1 text-sm text-gray-500 bg-gray-100 rounded-full">
                {formatDate(date)}
              </div>
            </div>
          )}
          <div
            className={`flex ${
              message.sender === "user" ? "justify-end" : "justify-start"
            } mb-2`}
          >
            <div
              className={`max-w-[70%] ${
                message.sender === "user"
                  ? "bg-main text-white rounded-tr-lg rounded-tl-lg rounded-bl-lg"
                  : "bg-[#F6F6F6] text-[#B7B1B1] rounded-tr-lg rounded-tl-lg rounded-br-lg"
              } p-3`}
            >
              <p>{message.text}</p>
              <p className="text-xs text-text mt-1">{formatTime(date)}</p>
            </div>
          </div>
        </div>
      );
    });
  };

  return (
    <div className="flex flex-col min-h-[600px]">
      {isAdmin && (
        <>
          <div className="p-4 border-b">
            <h2 className="text-xl font-semibold">
              Chat with {currentRoom ? `Room ${currentRoom.id}` : "Support"}
            </h2>
          </div>
          <hr className="w-full" />
        </>
      )}

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {renderMessages()}
        {isTyping && (
          <div className="flex items-center space-x-2 text-gray-500">
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]"></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.4s]"></div>
            </div>
            <span>Typing...</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="border-t p-4">
        <div className="flex items-center space-x-4">
          <input
            {...register("message")}
            className="flex-1 p-4 border rounded-lg focus:outline-none focus:border-main"
            placeholder="Type your message..."
          />
          <div className="flex items-center space-x-2">
            <button
              type="button"
              className="w-[45px] h-[45px] flex items-center justify-center text-gray-500 hover:text-main"
            >
              <BsEmojiSmile size={24} />
            </button>
            <button
              type="button"
              className="w-[45px] h-[45px] flex items-center justify-center text-gray-500 hover:text-main"
            >
              <BsPaperclip size={24} />
            </button>
            <button
              type="submit"
              className="w-[45px] h-[45px] flex items-center justify-center text-white bg-main rounded-lg hover:bg-opacity-90"
            >
              <BsSend size={20} />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

const isSameDay = (date1, date2) => {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
};

const formatDate = (date) => {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
};

const formatTime = (date) => {
  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  }).format(date);
};

export default ChatRoom;
