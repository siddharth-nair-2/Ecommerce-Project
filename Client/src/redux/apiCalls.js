import {
  loginFailure,
  loginStart,
  loginSuccess,
  logoutStart,
} from "./userRedux";
import { emptyCart } from "./cartRedux";
import { publicRequest } from "../requestMethods";

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
};

export const cartEmpty = async (dispatch) => {
  dispatch(emptyCart());
};
