import { createAsyncThunk } from "@reduxjs/toolkit";
import myAxios from "@/utils/myAxios";

export const updateProfileBasicInfo = createAsyncThunk(
  "auth/updateProfileBasicInfo",
  async (data, { rejectWithValue }) => {
    try {
      const response = await myAxios.put(
        "/users/mine?updateSet=basicInfo",
        data
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || {});
    }
  }
);

export const updateProfileAccountInfo = createAsyncThunk(
  "auth/updateProfileAccountInfo",
  async (data, { rejectWithValue }) => {
    try {
      const response = await myAxios.put(
        "/users/mine?updateSet=accountInfo",
        data
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || {});
    }
  }
);
