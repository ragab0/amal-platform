import { createAsyncThunk } from "@reduxjs/toolkit";
import myAxios from "@/utils/myAxios";

// Users (01)
export const fetchUsers = createAsyncThunk(
  "admin/fetchUsers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await myAxios.get("/admin/users");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || {});
    }
  }
);

// Users (02)
export const updateUser = createAsyncThunk(
  "admin/updateUser",
  async ({ id, userData }, { rejectWithValue }) => {
    try {
      const response = await myAxios.put(`/admin/users/${id}`, userData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || {});
    }
  }
);

// Users (03)
export const deleteUser = createAsyncThunk(
  "admin/deleteUser",
  async (id, { rejectWithValue }) => {
    try {
      const response = await myAxios.delete(`/admin/users/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || {});
    }
  }
);

// Jobs (01)
export const fetchJobs = createAsyncThunk(
  "admin/fetchJobs",
  async (_, { rejectWithValue }) => {
    try {
      const response = await myAxios.get("/admin/jobs");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || {});
    }
  }
);

// Jobs (02)
export const createJob = createAsyncThunk(
  "admin/createJob",
  async (jobData, { rejectWithValue }) => {
    try {
      const response = await myAxios.post("/admin/jobs", jobData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || {});
    }
  }
);

// Jobs (03)
export const updateJob = createAsyncThunk(
  "admin/updateJob",
  async ({ id, jobData }, { rejectWithValue }) => {
    try {
      const response = await myAxios.put(`/admin/jobs/${id}`, jobData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || {});
    }
  }
);

// Jobs (04)
export const deleteJob = createAsyncThunk(
  "admin/deleteJob",
  async (id, { rejectWithValue }) => {
    try {
      const response = await myAxios.delete(`/admin/jobs/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || {});
    }
  }
);

// Reviews (01)
export const fetchReviews = createAsyncThunk(
  "admin/fetchReviews",
  async (_, { rejectWithValue }) => {
    try {
      const response = await myAxios.get("/admin/reviews");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || {});
    }
  }
);

// Reviews (02)
export const createReview = createAsyncThunk(
  "admin/createReview",
  async (reviewData, { rejectWithValue }) => {
    try {
      const response = await myAxios.post("/admin/reviews", reviewData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || {});
    }
  }
);

// Reviews (03)
export const updateReview = createAsyncThunk(
  "admin/updateReview",
  async ({ id, reviewData }, { rejectWithValue }) => {
    try {
      const response = await myAxios.put(`/admin/reviews/${id}`, reviewData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || {});
    }
  }
);

// Reviews (04)
export const deleteReview = createAsyncThunk(
  "admin/deleteReview",
  async (id, { rejectWithValue }) => {
    try {
      const response = await myAxios.delete(`/admin/reviews/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || {});
    }
  }
);
