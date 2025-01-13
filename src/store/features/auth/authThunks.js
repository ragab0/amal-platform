/** error.response?.data is an object with two props {status: "success/fail", result/s} */
/** the result prop is either an object in case success or string in case fail */
/** the results prop is about an array of objects; */

import { createAsyncThunk } from "@reduxjs/toolkit";
import myAxios from "@/utils/myAxios";

export const signup = createAsyncThunk(
  "auth/signup",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await myAxios.post("/auth/signup", userData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || {});
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await myAxios.post("/auth/login", credentials);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || {});
    }
  }
);

export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      await myAxios.post("/auth/logout");
      return null;
    } catch (error) {
      return rejectWithValue(error.response?.data || {});
    }
  }
);

export const forgetPassword = createAsyncThunk(
  "auth/forget-password",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await myAxios.post("/auth/forget-password", credentials);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || {});
    }
  }
);

export const checkAuth = createAsyncThunk(
  "auth/checkAuth",
  async (_, { rejectWithValue }) => {
    try {
      const response = await myAxios.get("/auth/is-login");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || {});
    }
  }
);

export const generateVerificationCode = createAsyncThunk(
  "auth/generateVerificationCode",
  async (data, { rejectWithValue }) => {
    try {
      const response = await myAxios.post("/auth/generate-verification", data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || {});
    }
  }
);

export const verifyEmail = createAsyncThunk(
  "auth/verifyEmail",
  async (data, { rejectWithValue }) => {
    try {
      const response = await myAxios.post("/auth/verify-email", data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || {});
    }
  }
);

export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async (email, { rejectWithValue }) => {
    try {
      const response = await myAxios.post("/auth/forgot-password", { email });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || {});
    }
  }
);

export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async (data, { rejectWithValue }) => {
    try {
      const response = await myAxios.post("/auth/reset-password", data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || {});
    }
  }
);
