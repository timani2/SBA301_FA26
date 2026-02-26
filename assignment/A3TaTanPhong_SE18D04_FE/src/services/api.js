import axios from "axios";
import { toast } from "react-toastify";

const api = axios.create({
  baseURL: "http://localhost:8080/api", // Đường dẫn tới Spring Boot
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor 1: Gắn Token vào Request
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

// Interceptor 2: Bắt lỗi Response
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const status = error.response.status;
      const message = error.response.data || "Có lỗi xảy ra!";

      if (status === 401) {
        toast.error("Phiên đăng nhập hết hạn hoặc sai mật khẩu!");
        // Có thể thêm logic tự động xóa token và redirect về /login ở đây
      } else if (status === 403) {
        toast.warning("Bạn không có quyền truy cập chức năng này!");
      } else if (status === 400) {
        toast.error(
          typeof message === "string" ? message : "Dữ liệu không hợp lệ!",
        );
      }
    } else {
      toast.error("Không thể kết nối đến Server Spring Boot!");
    }
    return Promise.reject(error);
  },
);

export default api;
