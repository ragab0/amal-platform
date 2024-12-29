import { createAsyncThunk } from "@reduxjs/toolkit";
import myAxios from "@/utils/myAxios";

export const generateDescription = createAsyncThunk(
  "ai/generateDescription",
  async (data, { rejectWithValue }) => {
    console.log("########PRO IS", data);

    try {
      const response = await myAxios.post("/ai/generate", data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || {});
    }
  }
);
