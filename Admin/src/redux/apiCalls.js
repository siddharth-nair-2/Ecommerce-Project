import {
  loginFailure,
  loginStart,
  loginSuccess,
  logoutStart,
} from "./userRedux";
import {
  getProductStart,
  getProductSuccess,
  getProductFailure,
  clearProducts,
} from "./productRedux";
import {
  getUsersStart,
  getUsersSuccess,
  getUsersFailure,
  clearUsers,
} from "./allUsersRedux";
import {
  getOrderStart,
  getOrderSuccess,
  getOrderFailure,
  clearOrders,
} from "./ordersRedux";
import { publicRequest, userRequest } from "../requestMethods";

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/auth/login", user);
    dispatch(loginSuccess(res.data));
  } catch (error) {
    dispatch(loginFailure());
  }
};

export const logout = async (dispatch) => {
  dispatch(logoutStart());
  dispatch(clearProducts());
  dispatch(clearUsers());
  dispatch(clearOrders());
};

export const getProducts = async (dispatch) => {
  dispatch(getProductStart());
  try {
    const res = await publicRequest.get("/products/findAll");
    dispatch(getProductSuccess(res.data));
  } catch (error) {
    dispatch(getProductFailure());
  }
};
export const getUsers = async (dispatch) => {
  dispatch(getUsersStart());
  try {
    const res = await userRequest.get("/users/findAll");
    dispatch(getUsersSuccess(res.data));
  } catch (error) {
    dispatch(getUsersFailure());
  }
};
export const getOrders = async (dispatch) => {
  dispatch(getOrderStart());
  try {
    const res = await userRequest.get("/orders/findAll");
    dispatch(getOrderSuccess(res.data));
  } catch (error) {
    dispatch(getOrderFailure());
  }
};
