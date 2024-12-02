import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/utils/api";

export const getCV = createAsyncThunk(
  "cvs/getMine",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/cvs/mine");
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch CV"
      );
    }
  }
);

export const updateCV = createAsyncThunk(
  "cvs/update",
  async (cvData, { rejectWithValue }) => {
    try {
      const response = await api.put("/cvs/mine", cvData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update CV"
      );
    }
  }
);

// Admin: Get all CVs
export const getAllCVs = createAsyncThunk(
  "cvs/getAll",
  async ({ page = 1, limit = 10 }, { rejectWithValue }) => {
    try {
      const response = await api.get(`/cvs?page=${page}&limit=${limit}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch CVs"
      );
    }
  }
);
