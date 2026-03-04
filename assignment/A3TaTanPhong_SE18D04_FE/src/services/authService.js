import api from "./api";

export const authService = {
  // Đăng ký tài khoản (RegisterRequest)
  register: async (registerRequest) => {
    const response = await api.post("/auth/register", registerRequest);
    return response.data; // Trả về ApiResponse<AuthResponse>
  },

  // Đăng nhập (LoginRequest)
  login: async (loginRequest) => {
    const response = await api.post("/auth/login", loginRequest);
    return response.data; // Trả về ApiResponse<AuthResponse>
  },
};
