import axios from "axios";
import { getToken } from "../token/Token";

export const baseApi = axios.create({
  baseURL: "http://localhost:8089/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to inject JWT token
baseApi.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const request = ({
  method,
  url,
  data,
}: {
  method: string;
  url: string;
  data?: any;
}) =>
  baseApi({
    method,
    url,
    data,
  });
