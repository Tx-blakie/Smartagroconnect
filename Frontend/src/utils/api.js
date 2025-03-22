import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// Create axios instance with default configs
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor to add authentication token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle common errors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle 401 Unauthorized errors (token expired)
    if (error.response && error.response.status === 401) {
      // Clear token and trigger a logout
      localStorage.removeItem("token");
      window.dispatchEvent(new CustomEvent("auth:logout"));
    }
    return Promise.reject(error);
  }
);

// Auth API functions
export const authAPI = {
  // Register new user
  register: (userData) => {
    return api.post("/users/register", userData);
  },

  // Login with email and password
  login: (email, password) => {
    return api.post("/users/login", { email, password });
  },

  // Firebase authentication
  firebaseAuth: (userData) => {
    return api.post("/users/firebase-auth", userData);
  },

  // Get current user profile
  getProfile: () => {
    return api.get("/users/profile");
  },

  // Update user profile
  updateProfile: (userData) => {
    return api.put("/users/profile", userData);
  },
};

// Product API functions
export const productAPI = {
  // Get all products with optional filtering
  getProducts: (params) => {
    return api.get("/products", { params });
  },

  // Get product by ID
  getProductById: (id) => {
    return api.get(`/products/${id}`);
  },

  // Create new product
  createProduct: (productData) => {
    return api.post("/products", productData);
  },

  // Update existing product
  updateProduct: (id, productData) => {
    return api.put(`/products/${id}`, productData);
  },

  // Delete product
  deleteProduct: (id) => {
    return api.delete(`/products/${id}`);
  },

  // Get current user's products
  getUserProducts: () => {
    return api.get("/products/user/myproducts");
  },
};

// For file uploads (multipart/form-data)
export const uploadFile = (endpoint, formData, onProgress) => {
  return api.post(endpoint, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    onUploadProgress: (progressEvent) => {
      const percentCompleted = Math.round(
        (progressEvent.loaded * 100) / progressEvent.total
      );
      if (onProgress) {
        onProgress(percentCompleted);
      }
    },
  });
};

export default api;
