import api from "./api";

export const authService = {
  // Đăng nhập (Dành cho cả Staff và Customer)
  login: async (email, password) => {
    const response = await api.post("/auth/login", { email, password });
    return response.data; // Trả về JwtResponse { token, email, role, type }
  },

  // Khách hàng tự đăng ký tài khoản
  register: async (customerData) => {
    const response = await api.post("/auth/register", customerData);
    return response.data;
  },
};
