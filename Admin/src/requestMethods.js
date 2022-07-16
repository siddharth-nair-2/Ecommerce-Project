import axios from "axios";

const BASE_URL = "http://localhost:5000/api/";
let TOKEN;

if (localStorage.getItem("persist:root")) {
  if (JSON.parse(localStorage.getItem("persist:root")).user) {
    if (
      JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user)
        .currentUser
    ) {
      TOKEN = JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user)
        .currentUser.accessToken;
    } else TOKEN = "";
  } else TOKEN = "";
} else TOKEN = "";

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: { token: `Bearer ${TOKEN}` },
});
