import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000",
});

// Attach token to every request
api.interceptors.request.use(
  (config) => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user?.token) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }

    return config;
  },

  (error) => Promise.reject(error)
);

// Global response handler
api.interceptors.response.use(
  (response) => response,

  (error) => {
    // Auto logout if token expired
    if (error.response?.status === 401) {
      localStorage.removeItem("user");
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default api;
