import { createSlice } from "@reduxjs/toolkit";
import { fetchAllRooms, fetchRoom } from "./supportThunks";

const initialState = {
  allRooms: {
    list: [],
    loading: false,
    error: null,
    isInitialized: false,
  },
  room: {
    result: {},
    loading: false,
    error: null,
    isInitialized: false,
  },
};

const supportSlice = createSlice({
  name: "support",
  initialState,
  reducers: {
    setMessages: (state, { payload }) => {
      state.room.result.messages = payload;
    },
    addMessage: (state, { payload }) => {
      state.room.result.messages.push(payload);
    },
    setRoomsLastMsg: (state, { payload: { updatedMsg } }) => {
      const i = state.allRooms.list.findIndex((r) => r._id === updatedMsg.room);
      if (i > -1) {
        state.allRooms.list[i].lastMessage = updatedMsg;
      }
    },
    setRoomUnreadCount: (state, { payload: { roomId, count } }) => {
      const i = state.allRooms.list.findIndex((r) => r._id === roomId);
      if (i > -1) {
        state.allRooms.list[i].unreadCount = count;
      }
    },
    setRooms: (state, { payload }) => {
      state.allRooms.list = payload;
    },
    setNewRoom: (state, { payload }) => {
      state.allRooms.list.unshift(payload);
    },
    setRoomsLoading: (state, { payload }) => {
      state.allRooms.loading = payload;
    },
    setCurrentRoomId: (state, { payload: { roomId } }) => {
      if (roomId === state.room.result._id) return;
      state.room.result = {
        _id: roomId,
      };
    },
    setTyping: (state, { payload }) => {
      state.room.result.typing = payload;
    },
    setLoading: (state, { payload }) => {
      state.room.loading = payload;
    },
    setError: (state, { payload }) => {
      state.room.error = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // 01 fetchAllRooms
      .addCase(fetchAllRooms.pending, (state) => {
        state.allRooms.loading = true;
        state.allRooms.error = null;
      })
      .addCase(fetchAllRooms.fulfilled, (state, { payload }) => {
        state.allRooms.loading = false;
        state.allRooms.isInitialized = true;
        state.allRooms.list = payload.results;
      })
      .addCase(fetchAllRooms.rejected, (state, { payload }) => {
        state.allRooms.loading = false;
        state.allRooms.isInitialized = true;
        state.allRooms.error = payload.result?.message;
      })

      // 02 fetchRoom
      .addCase(fetchRoom.pending, (state) => {
        state.room.loading = true;
        state.room.error = null;
      })
      .addCase(fetchRoom.fulfilled, (state, { payload }) => {
        state.room.loading = false;
        state.room.result = payload.result;
        state.room.isInitialized = true;
      })
      .addCase(fetchRoom.rejected, (state, { payload }) => {
        state.room.loading = false;
        state.room.isInitialized = true;
        state.room.error = payload.result?.message;
      });
  },
});

export const {
  setMessages,
  addMessage,
  setRooms,
  setNewRoom,
  setRoomsLastMsg,
  setRoomUnreadCount,
  setRoomsLoading,
  setCurrentRoomId,
  setTyping,
  setLoading,
  setError,
} = supportSlice.actions;

export default supportSlice.reducer;
