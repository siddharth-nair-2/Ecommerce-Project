import { createSlice } from "@reduxjs/toolkit";

export const orderSlice = createSlice({
  name: "order",
  initialState: {
    orders: [],
    isFetching: false,
    error: false,
  },
  reducers: {
    // GET ALL
    getOrderStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    getOrderSuccess: (state, action) => {
      state.isFetching = false;
      state.orders = action.payload;
    },
    getOrderFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    clearOrders: (state) => {
      state.orders = [];
      state.isFetching = false;
      state.error = false;
    },
  },
});

export const {
  getOrderStart,
  getOrderSuccess,
  getOrderFailure,
  clearOrders,
} = orderSlice.actions;
export default orderSlice.reducer;
