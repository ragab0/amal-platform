import { io } from "socket.io-client";

const parsedUrl = new URL(process.env.NEXT_PUBLIC_API_URL).origin;

class SocketService {
  constructor() {
    this.socket = null;
    this.listeners = new Map();
    this.currentRoom = null;
  }

  // Connect & Disconnect
  connect() {
    if (!this.socket) {
      this.socket = io(parsedUrl, {
        withCredentials: true,
        transports: ["websocket"],
        autoConnect: true,
        reconnection: false,
      });

      this.socket.on("connect", () => {
        console.log("Socket connected:", this.socket.id);
      });

      this.socket.on("new_message", function (msg) {
        console.log("new_message", msg);
      });

      this.socket.on("disconnect", (reason) => {
        console.log("Socket disconnected:", reason);
      });

      this.socket.on("connect_error", (error) => {
        console.log("Socket connection error:", error);
      });

      this.socket.on("error_message", (error) => {
        console.log("Socket error message:", error);
      });

      this.socket.on("error", (error) => {
        console.log("Socket error:", error);
      });
    }
    return this.socket;
  }

  disconnect() {
    if (this.socket) {
      if (this.currentRoom) {
        this.leaveCurrentRoom();
      }
      this.socket.disconnect();
      this.socket = null;
      this.currentRoom = null;
    }
  }

  // // Room Management
  joinRoom(roomId) {
    if (!this.socket) return;
    console.log("JOOOOOOOOOOOOING ROOM");

    this.socket.emit("join_room", { roomId });
  }

  leaveRoom(roomId) {
    if (!this.socket || !this.currentRoom) return;
    this.socket.emit("leave_room", { roomId });
  }

  // Message & Status Management
  sendMessage(roomId, msgData) {
    if (!this.socket || !roomId) return;
    this.socket.emit("message", {
      roomId,
      msgData,
    });
  }

  sendStartTyping(roomId, isTyping) {
    if (!this.socket || !roomId) return;
    this.socket.emit("start_typing", {
      roomId,
      isTyping,
      isAdmin: this.isAdmin,
    });
  }

  sendStopTyping(roomId) {
    if (!this.socket || !roomId) return;
    this.socket.emit("stop_typing", {
      roomId,
    });
  }

  // sendTyping(roomId, isTyping) {
  //   if (!this.socket || !roomId) return;

  //   this.socket.emit("typing", {
  //     roomId,
  //     isTyping,
  //     isAdmin: this.isAdmin
  //   });
  // }
}

// Our only singleton instance;
const socketService = new SocketService();
export default socketService;
