import { createSlice } from "@reduxjs/toolkit";
import {
  createReview,
  getMyReview,
  updateReview,
  deleteReview,
  getAllReviews,
} from "./reviewsThunks";

const initialState = {
  // All reviews with pagination
  reviews: [],
  totalPages: 0,
  currentPage: 1,
  totalCount: 0,
  // Common states
  loading: false,
  error: null,
};

const reviewsSlice = createSlice({
  name: "reviews",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    resetReviews: () => initialState,
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Create Review
    builder
      .addCase(createReview.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createReview.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(createReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Get My Review
      .addCase(getMyReview.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMyReview.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(getMyReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Update Review
      .addCase(updateReview.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateReview.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(updateReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Delete Review
      .addCase(deleteReview.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteReview.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deleteReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Get All Reviews (Paginated)
      .addCase(getAllReviews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllReviews.fulfilled, (state, action) => {
        state.loading = false;
        state.reviews = action.payload.results;
        state.totalPages = action.payload.totalPages;
        state.currentPage = action.payload.page;
        state.totalCount = action.payload.totalCount;
      })
      .addCase(getAllReviews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { clearError, resetReviews, setCurrentPage } =
  reviewsSlice.actions;
export default reviewsSlice.reducer;
