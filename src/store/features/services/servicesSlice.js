import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedPlan: null,
  showPaymentMethods: false,
  selectedPaymentMethod: null,
};

const servicesSlice = createSlice({
  name: "services",
  initialState,
  reducers: {
    setSelectedPlan: (state, action) => {
      state.selectedPlan = action.payload;
      state.showPaymentMethods = true;
    },
    setSelectedPaymentMethod: (state, action) => {
      state.selectedPaymentMethod = action.payload;
    },
    resetPaymentFlow: (state) => {
      state.selectedPlan = null;
      state.showPaymentMethods = false;
      state.selectedPaymentMethod = null;
    },
  },
});

export const { setSelectedPlan, setSelectedPaymentMethod, resetPaymentFlow } =
  servicesSlice.actions;
export default servicesSlice.reducer;
