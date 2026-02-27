import axios, { type AxiosInstance } from "axios";

// Axios instance configured for the backend auth API
export const api: AxiosInstance = axios.create({
  baseURL: "http://localhost:5000/api/v1/auth",
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach JWT token from localStorage (browser only) to every request if available
api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = window.localStorage.getItem("token");
    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      };
    }
  }

  return config;
});

