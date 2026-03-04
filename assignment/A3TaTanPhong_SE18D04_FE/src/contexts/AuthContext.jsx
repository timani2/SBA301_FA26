import { createContext, useState, useEffect } from "react";
import { authService } from "../services/authService";
import { toast } from "react-toastify";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Kiểm tra trạng thái đăng nhập khi load trang
  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    const email = localStorage.getItem("email");

    if (token && role && email) {
      setUser({ token, role, email });
    }
    setLoading(false);
  }, []);

  // Hàm đăng nhập khớp với AuthResponse từ Backend
  const login = async (email, password) => {
    try {
      const response = await authService.login({ email, password });

      // Backend trả về ApiResponse<AuthResponse>
      // AuthResponse gồm: { token, email, role }
      const authData = response.data;

      if (authData && authData.token) {
        localStorage.setItem("token", authData.token);
        localStorage.setItem("role", authData.role);
        localStorage.setItem("email", authData.email);

        setUser({
          token: authData.token,
          role: authData.role,
          email: authData.email,
        });

        toast.success(response.message || "Đăng nhập thành công!");
        return authData;
      }
    } catch (error) {
      // Lỗi đã được xử lý một phần ở api.js interceptor
      throw error;
    }
  };

  // Hàm đăng xuất
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("email");
    setUser(null);
    toast.info("Đã đăng xuất tài khoản");
  };

  // Kiểm tra quyền (Role-based access)
  const isStaff = () => user?.role === "ROLE_STAFF";
  const isCustomer = () => user?.role === "ROLE_STAFF";

  return (
    <AuthContext.Provider
      value={{ user, login, logout, isStaff, isCustomer, loading }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};
