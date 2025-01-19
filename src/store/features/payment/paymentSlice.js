import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showPaymentForm: false,
  selectedPlan: null,
  loading: false,
  error: null,
};

const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    setShowPaymentForm: (state, { payload }) => {
      state.showPaymentForm = payload;
    },
    setSelectedPlan: (state, { payload }) => {
      state.selectedPlan = payload;
    },
    setLoading: (state, { payload }) => {
      state.loading = payload;
    },
    setError: (state, { payload }) => {
      state.error = payload;
    },
  },
});

export const { setShowPaymentForm, setSelectedPlan, setLoading, setError } =
  paymentSlice.actions;

export default paymentSlice.reducer;
