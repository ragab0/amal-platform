import axios from "axios";

const api = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_API_URL || "https://amal-platform-api.onrender.com",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Response interceptor for handling errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const { response } = error;
    if (response?.status === 401) {
      // Handle unauthorized access
      // You might want to redirect to login or refresh token
    }
    return Promise.reject(error);
  }
);

export default api;