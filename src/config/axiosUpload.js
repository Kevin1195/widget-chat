// src/api/axiosUpload.js
import { baseURL } from "@/config";
import axios from "axios";

// Tạo một instance của axios để upload ảnh
const axiosUpload = axios.create({
  baseURL: baseURL + "/api/v1",
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

// Interceptor để thêm token vào header của mỗi request
axiosUpload.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token_user");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor để xử lý các lỗi response
axiosUpload.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Xử lý khi gặp lỗi 401 (Unauthorized)
    if (error.response && error.response.status === 401) {
      // Thực hiện hành động, ví dụ như đăng xuất
      localStorage.removeItem("token_user");
      window.location.href = "/login"; // Điều hướng người dùng đến trang đăng nhập
    }
    return Promise.reject(error);
  }
);

export default axiosUpload;
