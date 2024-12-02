import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/utils/api";

export const createReview = createAsyncThunk(
  "reviews/create",
  async (reviewData, { rejectWithValue }) => {
    try {
      const response = await api.post("/reviews/mine", reviewData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create review"
      );
    }
  }
);

export const getMyReview = createAsyncThunk(
  "reviews/getMine",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/reviews/mine");
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch review"
      );
    }
  }
);

export const updateReview = createAsyncThunk(
  "reviews/update",
  async (reviewData, { rejectWithValue }) => {
    try {
      const response = await api.put("/reviews/mine", reviewData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update review"
      );
    }
  }
);

export const deleteReview = createAsyncThunk(
  "reviews/delete",
  async (_, { rejectWithValue }) => {
    try {
      await api.delete("/reviews/mine");
      return null;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete review"
      );
    }
  }
);

// Get all reviews (paginated)
export const getAllReviews = createAsyncThunk(
  "reviews/getAll",
  async ({ page = 1, limit = 10 }, { rejectWithValue }) => {
    try {
      const response = await api.get(`/reviews?page=${page}&limit=${limit}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch reviews"
      );
    }
  }
);
