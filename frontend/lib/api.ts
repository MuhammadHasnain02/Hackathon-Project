import axios, { type AxiosInstance } from "axios";

// Condition to check if running locally or on live server
const isLocal = typeof window !== "undefined" && window.location.hostname === "localhost";

const BACKEND_URL = isLocal 
  ? "http://localhost:5000/api/v1/auth" 
  : "https://hackathon-project-production-0cfd.up.railway.app/api/v1/auth";

// Axios instance configured for the backend auth API
export const api: AxiosInstance = axios.create({
  // baseURL: "http://localhost:5000/api/v1/auth",
  baseURL: BACKEND_URL,
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

