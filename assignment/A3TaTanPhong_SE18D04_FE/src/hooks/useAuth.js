import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

/**
 * useAuth Hook giúp các Component lấy thông tin người dùng và quyền hạn
 * một cách nhanh chóng mà không cần gọi useContext(AuthContext) ở mọi nơi.
 */
export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth phải được sử dụng bên trong AuthProvider");
  }

  const { user, login, logout, isStaff, isCustomer, loading } = context;

  return {
    // Thông tin người dùng hiện tại (token, role, email)
    user,

    // Các hàm xử lý xác thực
    login,
    logout,

    // Trạng thái chờ khi đang kiểm tra token ở localStorage
    loading,

    // Kiểm tra nhanh quyền hạn để hiển thị menu hoặc bảo vệ Route
    isStaff: isStaff(),
    isCustomer: isCustomer(),

    // Kiểm tra xem đã đăng nhập hay chưa
    isAuthenticated: !!user && !!user.token,
  };
};

export default useAuth;
