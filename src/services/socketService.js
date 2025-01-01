import { io } from "socket.io-client";

class SocketService {
  constructor() {
    this.socket = null;
    this.listeners = new Map();
  }

  connect() {
    if (!this.socket) {
      this.socket = io(process.env.NEXT_PUBLIC_API_URL, {
        withCredentials: true,
        autoConnect: true,
        reconnection: true,
        reconnectionDelay: 1000,
        reconnectionDelayMax: 5000,
        reconnectionAttempts: 5,
      });

      this.socket.on("connect", () => {
        console.log("Socket connected:", this.socket.id);
      });

      this.socket.on("connect_error", (error) => {
        console.log("Socket connection error:", error);
      });

      this.socket.on("disconnect", (reason) => {
        console.log("Socket disconnected:", reason);
      });
    }
    return this.socket;
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  // Join a room
  joinRoom(roomId) {
    if (this.socket) {
      this.socket.emit("join_room", { roomId });
    }
  }

  // Leave a room
  leaveRoom(roomId) {
    if (this.socket) {
      this.socket.emit("leave_room", { roomId });
    }
  }

  // Send a message
  sendMessage(roomId, message) {
    if (this.socket) {
      this.socket.emit("message", { roomId, message });
    }
  }

  // Send typing status
  sendTyping(roomId, isTyping) {
    if (this.socket) {
      this.socket.emit("typing", { roomId, isTyping });
    }
  }

  // GLOBAL Add event listener
  on(event, callback) {
    if (this.socket) {
      this.socket.on(event, callback);
      // Store the callback for cleanup
      if (!this.listeners.has(event)) {
        this.listeners.set(event, new Set());
      }
      this.listeners.get(event).add(callback);
    }
  }

  // GLOBAL Remove event listener
  off(event, callback) {
    if (this.socket) {
      this.socket.off(event, callback);
      // Remove from stored listeners
      if (this.listeners.has(event)) {
        this.listeners.get(event).delete(callback);
      }
    }
  }

  // GLOBAL Remove all listeners for an event
  removeAllListeners(event) {
    if (this.socket) {
      this.socket.removeAllListeners(event);
      this.listeners.delete(event);
    }
  }
}

// Our only singleton instance;
const socketService = new SocketService();
export default socketService;
