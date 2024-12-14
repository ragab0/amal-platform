import { createSlice } from "@reduxjs/toolkit";
import { getCV, updateCV, getAllCVs } from "./cvsThunks";

const initialState = {
  // User's personal CV
  myCV: {},
  // Admin: All CVs with pagination
  cvs: [],
  totalPages: 0,
  currentPage: 1,
  totalCount: 0,
  // Common states
  loading: false,
  isInitialized: false,
  error: null,
};

const cvsSlice = createSlice({
  name: "cvs",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    resetCVs: () => initialState,
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Get My CV
    builder
      .addCase(getCV.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCV.fulfilled, (state, action) => {
        state.loading = false;
        state.myCV = action.payload.result;
        state.isInitialized = true;
      })
      .addCase(getCV.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.isInitialized = true;
      })

      // Update My CV
      .addCase(updateCV.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCV.fulfilled, (state, action) => {
        state.loading = false;
        state.myCV = action.payload.result;
      })
      .addCase(updateCV.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Admin: Get All CVs
      .addCase(getAllCVs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllCVs.fulfilled, (state, action) => {
        state.loading = false;
        state.cvs = action.payload.results;
        state.totalPages = action.payload.totalPages;
        state.currentPage = action.payload.page;
        state.totalCount = action.payload.totalCount;
      })
      .addCase(getAllCVs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { clearError, resetCVs, setCurrentPage } = cvsSlice.actions;
export default cvsSlice.reducer;
