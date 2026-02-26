import React, { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode"; // Thư viện dùng để giải mã JWT Token

// Tạo Context
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // State lưu thông tin người dùng: { email, role }
  const [user, setUser] = useState(null);

  // State kiểm tra trạng thái đang load (để tránh chớp màn hình khi F5)
  const [loading, setLoading] = useState(true);

  // Kiểm tra token trong LocalStorage mỗi khi ứng dụng khởi chạy hoặc tải lại trang
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        // Giải mã token để lấy thông tin
        const decoded = jwtDecode(token);

        // Kiểm tra xem token đã hết hạn chưa (exp tính bằng giây)
        const currentTime = Date.now() / 1000;
        if (decoded.exp < currentTime) {
          console.warn("Token đã hết hạn!");
          localStorage.removeItem("token");
          setUser(null);
        } else {
          // Nếu hợp lệ, lưu thông tin vào state
          // Backend trả về 'sub' là email và 'role' là quyền
          setUser({ email: decoded.sub, role: decoded.role });
        }
      } catch (error) {
        console.error("Token không hợp lệ", error);
        localStorage.removeItem("token");
      }
    }
    setLoading(false); // Đã kiểm tra xong
  }, []);

  // Hàm gọi khi đăng nhập thành công (Được gọi từ tầng Hooks)
  const loginContext = (token) => {
    localStorage.setItem("token", token);
    const decoded = jwtDecode(token);
    setUser({ email: decoded.sub, role: decoded.role });
  };

  // Hàm gọi khi đăng xuất
  const logoutContext = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  // Nếu đang kiểm tra token ở lần tải trang đầu tiên thì hiện chữ "Đang tải..."
  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Đang tải hệ thống...</span>
        </div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ user, loginContext, logoutContext }}>
      {children}
    </AuthContext.Provider>
  );
};
