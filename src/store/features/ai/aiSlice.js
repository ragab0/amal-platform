import { createSlice } from "@reduxjs/toolkit";
import { generateDescription } from "./aiThunks";

const initialState = {
  result: {},
  isInitialized: null,
  loading: false,
  error: null,
};

const aiSlice = createSlice({
  name: "ai",
  initialState,
  extraReducers: (builder) => {
    builder
      // 01
      .addCase(generateDescription.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(generateDescription.fulfilled, (state, { payload }) => {
        state.isInitialized = true;
        state.loading = false;
        state.result = payload.result;
      })
      .addCase(generateDescription.rejected, (state, { payload }) => {
        state.isInitialized = true;
        state.loading = false;
        state.error = payload.result?.message;
      });
  },
});

export default aiSlice.reducer;
