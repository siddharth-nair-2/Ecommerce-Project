import { createSlice } from "@reduxjs/toolkit";

export const allUsersSlice = createSlice({
  name: "allUsers",
  initialState: {
    allUsers: [],
    isFetching: false,
    error: false,
  },
  reducers: {
    // GET ALL
    getUsersStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    getUsersSuccess: (state, action) => {
      state.isFetching = false;
      state.allUsers = action.payload;
    },
    getUsersFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    clearUsers: (state) => {
      state.allUsers = [];
      state.isFetching = false;
      state.error = false;
    },
  },
});

export const { getUsersStart, getUsersSuccess, getUsersFailure, clearUsers } =
  allUsersSlice.actions;
export default allUsersSlice.reducer;
