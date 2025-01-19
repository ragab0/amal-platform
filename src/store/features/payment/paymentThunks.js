import myAxios from "@/utils/myAxios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const processPayment = createAsyncThunk(
  "payment/processPayment",
  async (data, { rejectWithValue }) => {
    try {
      const response = await myAxios.post("/payment/process", data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || {});
    }
  }
);
