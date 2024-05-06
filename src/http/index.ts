import axios from "axios";

const baseUrl: string = 'http://localhost:8000/api';

const http = axios.create({
  baseURL: baseUrl,
  headers: {
    "Accept": "application/json",
    "Content-Type": "application/json",
  }
});

http.interceptors.request.use(config => {
  const accessToken = sessionStorage.getItem('access_token');
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
