import { createAsyncThunk } from "@reduxjs/toolkit";
import myAxios from "@/utils/myAxios";

export const createReview = createAsyncThunk(
  "reviews/create",
  async (reviewData, { rejectWithValue }) => {
    try {
      const response = await myAxios.post("/reviews", reviewData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || {});
    }
  }
);

export const getMyReview = createAsyncThunk(
  "reviews/getMine",
  async (id, { rejectWithValue }) => {
    try {
      const response = await myAxios.get(`/reviews/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || {});
    }
  }
);

export const updateReview = createAsyncThunk(
  "reviews/update",
  async (reviewData, { rejectWithValue }) => {
    try {
      const response = await myAxios.put(
        `/reviews/${reviewData._id}`,
        reviewData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || {});
    }
  }
);

export const deleteReview = createAsyncThunk(
  "reviews/delete",
  async (id, { rejectWithValue }) => {
    try {
      await myAxios.delete(`/reviews/${id}`);
      return null;
    } catch (error) {
      return rejectWithValue(error.response?.data || {});
    }
  }
);

// Get all reviews (paginated)
export const getAllReviews = createAsyncThunk(
  "reviews/getAll",
  async ({ page = 1, limit = 10 }, { rejectWithValue }) => {
    try {
      const response = await myAxios.get(
        `/reviews?page=${page}&limit=${limit}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || {});
    }
  }
);
