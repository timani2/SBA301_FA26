import axios from "axios";
import { toast } from "react-toastify";

const api = axios.create({
  baseURL: "http://localhost:8080", // Khớp với port mặc định của Spring Boot
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const { status, data } = error.response;
      if (status === 401) {
        toast.error("Phiên đăng nhập hết hạn hoặc sai mật khẩu!");
      } else if (status === 403) {
        toast.warning("Bạn không có quyền truy cập chức năng này!");
      } else {
        // Hiển thị lỗi từ ApiResponse.message của BE nếu có
        toast.error(data.message || "Đã xảy ra lỗi!");
      }
    } else {
      toast.error("Không thể kết nối đến Server! Vui lòng kiểm tra CORS.");
    }
    return Promise.reject(error);
  },
);

export default api;
