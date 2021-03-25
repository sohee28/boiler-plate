import axios from "axios";
import { LOGIN_USER, AUTH_USER, REGISTER_USER } from "./types";

export function loginUser(dataTosubmit) {
  const request = axios
    .post("/api/user/login", dataTosubmit)
    .then((response) => response.data);

  return {
    type: LOGIN_USER,
    payload: request,
  };
}

export function registerUser(dataTosubmit) {
  const request = axios
    .post("/api/user/register", dataTosubmit)
    .then((response) => response.data);

  return {
    type: REGISTER_USER,
    payload: request,
  };
}
export function auth(dataTosubmit) {
  const request = axios
    .get("/api/user/auth", dataTosubmit)
    .then((response) => response.data);

  return {
    type: AUTH_USER,
    payload: request,
  };
}
