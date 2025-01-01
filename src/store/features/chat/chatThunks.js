import { createAsyncThunk } from "@reduxjs/toolkit";
import { setMessages, setRooms, setLoading, setError } from "./chatSlice";

// Dummy data for development
const dummyRooms = [
  { id: 1, name: "User 1", lastMessage: "Hello, I need help!", unread: 2 },
  { id: 2, name: "User 2", lastMessage: "Thank you for your assistance", unread: 0 },
  { id: 3, name: "User 3", lastMessage: "Is anyone available?", unread: 1 },
];

const dummyMessages = {
  1: [
    {
      id: 1,
      text: "Hello, I need help with my account",
      sender: "user",
      timestamp: "2024-12-31T14:30:00",
    },
    {
      id: 2,
      text: "Hi! I'd be happy to help. What seems to be the issue?",
      sender: "admin",
      timestamp: "2024-12-31T14:32:00",
    },
    {
      id: 3,
      text: "I can't access my dashboard",
      sender: "user",
      timestamp: "2024-12-31T14:33:00",
    },
  ],
};

export const fetchRooms = createAsyncThunk(
  "chat/fetchRooms",
  async (_, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      dispatch(setRooms(dummyRooms));
      return dummyRooms;
    } catch (error) {
      dispatch(setError(error.message));
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  }
);

export const fetchMessages = createAsyncThunk(
  "chat/fetchMessages",
  async (roomId, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      const messages = dummyMessages[roomId] || [];
      dispatch(setMessages({ roomId, messages }));
      return messages;
    } catch (error) {
      dispatch(setError(error.message));
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  }
);
