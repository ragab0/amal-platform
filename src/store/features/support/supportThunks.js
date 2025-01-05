import myAxios from "@/utils/myAxios";
import { createAsyncThunk } from "@reduxjs/toolkit";

// Dummy data for development
// const dummyRooms = [
//   { id: 1, name: "User 1", lastMessage: "Hello, I need help!", unread: 2 },
//   { id: 2, name: "User 2", lastMessage: "Thank you for your assistance", unread: 0 },
//   { id: 3, name: "User 3", lastMessage: "Is anyone available?", unread: 1 },
// ];

// const dummyMessages = {
//   1: [
//     {
//       id: 1,
//       text: "Hello, I need help with my account",
//       sender: "user",
//       timestamp: "2024-12-31T14:30:00",
//     },
//     {
//       id: 2,
//       text: "Hi! I'd be happy to help. What seems to be the issue?",
//       sender: "admin",
//       timestamp: "2024-12-31T14:32:00",
//     },
//     {
//       id: 3,
//       text: "I can't access my dashboard",
//       sender: "user",
//       timestamp: "2024-12-31T14:33:00",
//     },
//   ],
// };

export const fetchAllRooms = createAsyncThunk(
  "support/fetchAllRooms",
  async (_, { rejectWithValue }) => {
    try {
      const response = await myAxios.get("/chats");
      return response.data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error.response?.data || {});
    }
  }
);

export const fetchRoom = createAsyncThunk(
  "support/fetchRoom",
  async (roomId, { rejectWithValue }) => {
    try {
      const response = await myAxios.get(`/chats/${roomId}`);
      return response.data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error.response?.data || {});
    }
  }
);
