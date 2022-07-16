import { createSlice } from "@reduxjs/toolkit";

export const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    isFetching: false,
    error: false,
  },
  reducers: {
    // GET ALL
    getProductStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    getProductSuccess: (state, action) => {
      state.isFetching = false;
      state.products = action.payload;
    },
    getProductFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    clearProducts: (state) => {
      state.products = [];
      state.isFetching = false;
      state.error = false;
    },
  },
});

export const {
  getProductStart,
  getProductSuccess,
  getProductFailure,
  clearProducts,
} = productSlice.actions;
export default productSlice.reducer;
