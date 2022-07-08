import axios from "axios";

const BASE_URL = "http://localhost:5000/api/";
const TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyYzI5MmQzODljN2NhMmI0ZmM3ZDg4MyIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY1NzEyMzQxMCwiZXhwIjoxNjU3MzgyNjEwfQ.qubpDlILz-EykVd4x82Cxakw9WDom3PsdOqQZ4ib_Cw";

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: { token: `Bearer ${TOKEN}` },
});
