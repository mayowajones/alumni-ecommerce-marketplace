import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL
    ? `${import.meta.env.VITE_API_URL}/api`
    : "/api",
});

// Attach the JWT to every outgoing request automatically, so individual
// components never have to remember to do it.
api.interceptors.request.use((config) => {
  const stored = localStorage.getItem("userInfo");
  if (stored) {
    try {
      const { token } = JSON.parse(stored);
      if (typeof token === "string" && token.trim()) {
        config.headers.Authorization = `Bearer ${token}`;
      } else {
        localStorage.removeItem("userInfo");
      }
    } catch {
      localStorage.removeItem("userInfo");
    }
  }
  return config;
});

// Centralized handling for expired/invalid tokens.
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("userInfo");
    }
    return Promise.reject(error);
  }
);

export default api;
