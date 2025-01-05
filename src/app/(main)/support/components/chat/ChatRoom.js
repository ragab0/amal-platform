"use client";
import "./ChatRoom.css";
import socketService from "@/services/socketService";
import YoungCircleLoader from "@/components/loaders/YoungCircleLoader";
import { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/ReduxHooks";
import { useForm } from "react-hook-form";
import { BsEmojiSmile, BsPaperclip, BsSend } from "react-icons/bs";
import { fetchRoom } from "@/store/features/support/supportThunks";
import { addMessage } from "@/store/features/support/supportSlice";
import { useState } from "react";

const ChatRoom = ({ isAdmin = false, prevRoom = null }) => {
  const bodyRef = useRef(null);
  const dispatch = useAppDispatch();
  const [isTyping, setIsTyping] = useState(null);
  const [isTypingSent, setIsTypingSent] = useState(null);
  const {
    user: { _id: userId },
  } = useAppSelector((state) => state.auth);
  const {
    room: { result: currentRoom = {}, isInitialized, loading },
  } = useAppSelector((state) => state.support);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();
  const msg = watch("message", "");

  // Initialize socket with user type
  useEffect(() => {
    if (isAdmin) {
      dispatch(fetchRoom(currentRoom._id));
      socketService.joinRoom(currentRoom._id);
    } else {
      dispatch(fetchRoom("mine"));
    }

    socketService.socket.on("new_message", (message) => {
      dispatch(addMessage(message));
    });

    socketService.socket.on("user_started_typing", function ({ userId: uI }) {
      if (userId !== uI) {
        setIsTyping(true);
      }
    });

    socketService.socket.on("user_stopped_typing", function ({ userId: uI }) {
      if (userId !== uI) {
        setIsTyping(false);
      }
    });

    return function () {
      socketService.leaveRoom(currentRoom._id);
      socketService.socket.removeListener("new_message");
      socketService.socket.removeListener("user_started_typing");
      socketService.socket.removeListener("user_stopped_typing");
      socketService.sendStopTyping(currentRoom._id);
    };
  }, [dispatch, currentRoom._id, isAdmin]);

  useEffect(
    function () {
      if (!currentRoom?._id) return;
      const isTyping = msg.length > 0;
      console.log(msg, isTyping, isTypingSent);

      if (isTyping) {
        if (isTypingSent) return;
        socketService.sendStartTyping(currentRoom._id, isTyping);
        setIsTypingSent(true);
      } else {
        socketService.sendStopTyping(currentRoom._id);
        setIsTypingSent(false);
      }

      return function () {
        setIsTypingSent(false);
      };
    },
    [msg]
  );

  // Scroll to bottom on new messages
  useEffect(() => {
    bodyRef.current?.scrollTo({
      behavior: "smooth",
      top: bodyRef.current.scrollHeight,
    });
  }, [currentRoom?.messages]);

  const onSubmit = (data) => {
    console.log(data);

    socketService.sendMessage(currentRoom._id, {
      text: data.message,
    });
    reset();
  };

  const renderMessages = () => {
    const allMessages = [...(currentRoom?.messages || [])];

    let lastDate = null;

    return allMessages.map((message) => {
      const date = new Date(message.createdAt);
      const showDate = !lastDate || !isSameDay(lastDate, date);
      lastDate = date;
      const isSentByMe = message.sender === userId;

      return (
        <div key={message._id}>
          {showDate && (
            <div className="flex items-center justify-center my-4">
              <div className="px-4 py-1 text-sm text-gray-500 bg-gray-100 rounded-full">
                {formatDate(date)}
              </div>
            </div>
          )}
          <div
            className={`flex ${
              isSentByMe ? "justify-start" : "justify-end"
            } mb-2 rtl`}
          >
            <div
              className={`max-w-[70%] ${
                isSentByMe
                  ? "bg-emerald-600 text-white rounded-tr-lg rounded-tl-lg rounded-bl-lg"
                  : "bg-[#F6F6F6] text-gray-700 rounded-tr-lg rounded-tl-lg rounded-br-lg"
              } p-3 relative`}
            >
              <p>{message.text}</p>
              <p
                className={`text-xs mt-1 ${
                  isSentByMe ? "text-emerald-100" : "text-gray-500"
                }`}
              >
                {formatTime(date)}
                {/* {isPending && " (جاري الإرسال...)"} */}
                {/* {isFailed && " (فشل الإرسال)"} */}
              </p>
            </div>
          </div>
        </div>
      );
    });
  };

  if (!isInitialized || loading) {
    return (
      <YoungCircleLoader
        isHFull={true}
        isBig={true}
        className="min-h-[600px]"
      />
    );
  }

  return (
    <div className="flex flex-col h-[600px]">
      <div className="p-4 border-b border-b-neutral-300">
        <h2 className="text-xl font-semibold">تحدث مع الدعم</h2>
      </div>

      <div className="flex-1 p-4 overflow-y-auto" ref={bodyRef}>
        {renderMessages()}
        {isTyping && (
          <div className="typing-indicator">
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
          </div>
        )}
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="border-t border-t-neutral-300 p-4"
      >
        <div className="flex items-center gap-2">
          <input
            {...register("message")}
            className="flex-1 p-3 border rounded-lg focus:outline-none focus:border-main"
            placeholder="اكتب رسالتك..."
          />
          <div className="flex items-center">
            <button
              type="button"
              className="py-3 px-2 flex items-center justify-center text-gray-500 hover:text-main"
            >
              <BsEmojiSmile size={24} />
            </button>
            <button
              type="button"
              className="py-3 px-2 flex items-center justify-center text-gray-500 hover:text-main"
            >
              <BsPaperclip size={24} />
            </button>
            <button
              type="submit"
              className="p-2 ms-2 text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 transition-colors"
            >
              <BsSend size={24} />
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
  return new Intl.DateTimeFormat("ar-EG", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
};

const formatTime = (date) => {
  return new Intl.DateTimeFormat("ar-EG", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  }).format(date);
};

export default ChatRoom;
