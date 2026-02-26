import axios from "axios";
import { toast } from "react-toastify";

const api = axios.create({
  // Đảm bảo cổng 8080 là chính xác và Backend có @RequestMapping("/api")
  baseURL: "http://localhost:8080/api",
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
      const status = error.response.status;
      if (status === 401) {
        toast.error("Phiên đăng nhập hết hạn hoặc sai mật khẩu!");
      } else if (status === 403) {
        toast.warning("Bạn không có quyền truy cập chức năng này!");
      }
    } else {
      // Lỗi này thường xảy ra khi Backend chưa bật CORS hoặc chưa chạy
      toast.error(
        "Không thể kết nối đến Server Spring Boot! Vui lòng kiểm tra CORS.",
      );
    }
    return Promise.reject(error);
  },
);

export default api;
