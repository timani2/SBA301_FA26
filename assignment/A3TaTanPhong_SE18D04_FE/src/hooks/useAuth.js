import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { authService } from "../services/authService";
import { AuthContext } from "../contexts/AuthContext";

export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const { loginContext, logoutContext } = useContext(AuthContext);
  const navigate = useNavigate();

  // Hàm xử lý Đăng nhập
  const login = async (email, password) => {
    if (!email || !password) {
      toast.warning("Vui lòng nhập đầy đủ Email và Mật khẩu!");
      return;
    }

    setLoading(true);
    try {
      // Gọi tầng Service
      const data = await authService.login(email, password);

      // data trả về từ BE là JwtResponse { token, email, role, type }
      loginContext(data.token);
      toast.success("Đăng nhập thành công!");

      // Điều hướng dựa trên phân quyền (Role)
      if (data.role === "ROLE_STAFF") {
        navigate("/staff/rooms"); // Staff vào trang quản lý
      } else {
        navigate("/rooms"); // Customer vào trang xem phòng
      }
    } catch (error) {
      // Lỗi (như sai pass, 401) đã được api.js tự động bắt và hiện Toast.
      // Ở đây không cần toast.error nữa.
      console.error("Lỗi đăng nhập:", error);
    } finally {
      setLoading(false);
    }
  };

  // Hàm xử lý Đăng ký (Dành cho Customer)
  const register = async (customerData) => {
    setLoading(true);
    try {
      await authService.register(customerData);
      toast.success("Đăng ký thành công! Vui lòng đăng nhập.");
      navigate("/login");
    } catch (error) {
      console.error("Lỗi đăng ký:", error);
    } finally {
      setLoading(false);
    }
  };

  // Hàm xử lý Đăng xuất
  const logout = () => {
    logoutContext();
    toast.info("Bạn đã đăng xuất khỏi hệ thống.");
    navigate("/login");
  };

  return { login, register, logout, loading };
};
