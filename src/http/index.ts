import axios from "axios";
import {
  REACT_APP_BASE_API_URL,
  REACT_APP_STORAGE_ACCESS_TOKEN_KEY
} from "../../globals.ts";

const http = axios.create({
  baseURL: REACT_APP_BASE_API_URL,
  headers: {
    "Accept": "application/json",
    "Content-Type": "application/json",
  }
});

http.interceptors.request.use(config => {
  const accessToken = sessionStorage.getItem(REACT_APP_STORAGE_ACCESS_TOKEN_KEY);
  if (accessToken && config.headers) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
}, error => Promise.reject(error));

http.interceptors.response.use(response => {
  return response;
}, error => {
  if (error.response?.status === 401) {
    return Promise.reject();
  }
  return Promise.reject(error)
});

export default http;
