import { createAsyncThunk } from "@reduxjs/toolkit";
import myAxios from "@/utils/myAxios";

export const getCV = createAsyncThunk(
  "cvs/getMine",
  async (_, { rejectWithValue }) => {
    try {
      const response = await myAxios.get("/cvs/mine");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || {});
    }
  }
);

export const updateCV = createAsyncThunk(
  "cvs/update",
  async (cvData, { rejectWithValue }) => {
    try {
      const response = await myAxios.put("/cvs/mine", cvData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || {});
    }
  }
);

// Admin: Get all CVs
export const getAllCVs = createAsyncThunk(
  "cvs/getAll",
  async ({ page = 1, limit = 10 }, { rejectWithValue }) => {
    try {
      const response = await myAxios.get(`/cvs?page=${page}&limit=${limit}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || {});
    }
  }
);
