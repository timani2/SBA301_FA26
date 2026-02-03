import API from "./api";

export const authService = {
  login: (credentials) => API.post("/auth/login", credentials),

  // Hàm tiện ích để lưu/lấy thông tin user từ localStorage
  setCurrentUser: (user) => localStorage.setItem("user", JSON.stringify(user)),
  getCurrentUser: () => JSON.parse(localStorage.getItem("user")),
  logout: () => localStorage.removeItem("user"),
};
