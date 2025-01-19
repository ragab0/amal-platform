import { createSlice } from "@reduxjs/toolkit";
import { processPayment } from "./paymentThunks";

const initialState = {
  loading: false,
  error: null,
  success: false,
  selectedMethod: "card",
};

const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    setSelectedMethod: (state, { payload }) => {
      state.selectedMethod = payload;
    },
    resetPaymentState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(processPayment.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(processPayment.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(processPayment.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
  },
});

export const { setSelectedMethod, resetPaymentState } = paymentSlice.actions;

export default paymentSlice.reducer;
