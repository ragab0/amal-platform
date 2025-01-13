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

export const createCv = createAsyncThunk(
  "cvs/create",
  async (cvData, { rejectWithValue }) => {
    try {
      const response = await myAxios.post("/cvs", cvData);
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

export const setMyCVOptions = createAsyncThunk(
  "cvs/setMyCVOptions",
  async ({ sectionKey, fieldKey, isSelected }, { getState }) => {
    // Simulate async operation to allow for proper state updates
    await new Promise((resolve) => setTimeout(resolve, 0));
    return { sectionKey, fieldKey, isSelected };
  }
);

export const updateFontOptions = createAsyncThunk(
  "cvs/updateFontOptions",
  async (fontOptions) => {
    // Simulate async operation to allow for proper state updates and loading
    await new Promise((resolve) => setTimeout(resolve, 0));
    return fontOptions;
  }
);
