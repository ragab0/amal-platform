import myAxios from "@/utils/myAxios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const processPayment = createAsyncThunk(
  "payment/processPayment",
  async (data, { rejectWithValue }) => {
    try {
      const response = await myAxios.post(`/payment/${data.usedMethod}`, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || {});
    }
  }
);

export const createPaypalOrder = createAsyncThunk(
  "payment/createPaypalOrder",
  async (data, { rejectWithValue }) => {
    try {
      const response = await myAxios.post(`/payment/create-paypal-order`, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || {});
    }
  }
);
