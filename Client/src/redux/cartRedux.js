import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    quantity: 0,
    total: 0,
  },
  reducers: {
    addProduct: (state, action) => {
      const item = state.products.find(
        (product) =>
          product._id === action.payload._id &&
          product.size === action.payload.size
      );
      if (item) {
        state.products = state.products.map((product) =>
          product._id === action.payload._id
            ? {
                ...product,
                quantity: product.quantity + action.payload.quantity,
              }
            : product
        );
        state.total =
          state.total + action.payload.price * action.payload.quantity;
      } else {
        state.quantity += 1;
        state.products.push(action.payload);
        state.total += action.payload.price * action.payload.quantity;
      }
    },
    addSingleProduct: (state, action) => {
      const item = state.products.find(
        (product) =>
          product._id === action.payload._id &&
          product.size === action.payload.size
      );
      if (item) {
        state.products = state.products.map((product) => {
          return product._id === action.payload._id &&
            product.size === action.payload.size
            ? {
                ...product,
                quantity: product.quantity + 1,
              }
            : product;
        });
        state.total = state.total + action.payload.price;
      } else {
        return {
          ...state,
        };
      }
    },
    removeSingleProduct: (state, action) => {
      const item = state.products.find(
        (product) =>
          product._id === action.payload._id &&
          product.size === action.payload.size
      );
      if (item) {
        state.products = state.products.map((product) =>
          product._id === action.payload._id &&
          product.size === action.payload.size
            ? {
                ...product,
                quantity: product.quantity - 1,
              }
            : product
        );
        state.total = state.total - action.payload.price;
      }
    },
    removeProduct: (state, action) => {
      state.quantity = state.quantity - 1;
      state.total =
        state.total - action.payload.price * action.payload.quantity;
      state.products = state.products.filter(
        (product) =>
          !(
            product._id === action.payload._id &&
            product.size === action.payload.size
          )
      );
    },
    emptyCart: (state) => {
      state.quantity = 0;
      state.products = [];
      state.total = 0;
    },
  },
});

export const {
  addProduct,
  emptyCart,
  addSingleProduct,
  removeSingleProduct,
  removeProduct,
} = cartSlice.actions;
export default cartSlice.reducer;
