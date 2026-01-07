import axios from "axios";

/**
 * Axios instance used across the entire client
 * - Automatically attaches JWT token
 * - Handles auth errors globally
 */

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

/**
 * Request interceptor
 * Adds Authorization header if token exists
 */
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

/**
 * Response interceptor
 * Handles authentication / permission errors
 */
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;

    if (status === 401) {
      localStorage.removeItem("token");
    }

    if (status === 403) {
      console.warn("Forbidden: insufficient permissions");
    }

    return Promise.reject(error);
  }
);

export default api;
