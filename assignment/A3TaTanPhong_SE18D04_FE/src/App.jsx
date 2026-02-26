import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Import Layout & Context
import MainLayout from "./components/common/MainLayout";
import { AuthContext } from "./contexts/AuthContext";

// Import Các Trang Giao Diện (Đã mở comment)
import Home from "./pages/public/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ManageRooms from "./pages/staff/ManageRooms";
import ManageCustomers from "./pages/staff/ManageCustomers";
import Profile from "./pages/customer/Profile";
import BookingHistory from "./pages/customer/BookingHistory";

// Component Bảo vệ Router (Chỉ cho phép Role được chỉ định truy cập)
const ProtectedRoute = ({ children, allowedRole }) => {
  const { user } = useContext(AuthContext);

  // Nếu chưa đăng nhập -> Đẩy về trang Login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Nếu có yêu cầu quyền hạn mà User không khớp -> Đẩy về trang chủ
  if (allowedRole && user.role !== allowedRole) {
    return <Navigate to="/rooms" replace />;
  }

  return children;
};

function App() {
  return (
    <Router>
      {/* Cấu hình Toastify dùng chung cho toàn hệ thống */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        theme="colored"
      />

      <Routes>
        {/* =======================================
                    LUỒNG 1: KHÔNG CẦN LAYOUT (AUTH) 
                ======================================== */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* =======================================
                    LUỒNG 2: SỬ DỤNG LAYOUT CHÍNH 
                ======================================== */}
        <Route element={<MainLayout />}>
          {/* PUBLIC ROUTES (Ai cũng vào được) */}
          <Route path="/" element={<Navigate to="/rooms" replace />} />
          <Route path="/rooms" element={<Home />} />

          {/* CUSTOMER ROUTES (Chỉ ROLE_CUSTOMER) */}
          <Route
            path="/customer/profile"
            element={
              <ProtectedRoute allowedRole="ROLE_CUSTOMER">
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/customer/history"
            element={
              <ProtectedRoute allowedRole="ROLE_CUSTOMER">
                <BookingHistory />
              </ProtectedRoute>
            }
          />

          {/* STAFF ROUTES (Chỉ ROLE_STAFF) */}
          <Route
            path="/staff/rooms"
            element={
              <ProtectedRoute allowedRole="ROLE_STAFF">
                <ManageRooms />
              </ProtectedRoute>
            }
          />
          <Route
            path="/staff/customers"
            element={
              <ProtectedRoute allowedRole="ROLE_STAFF">
                <ManageCustomers />
              </ProtectedRoute>
            }
          />

          {/* Chú ý: Trang ManageBookings (Staff) ta chưa tạo file JSX, 
                        nếu bạn bấm vào từ Header có thể báo lỗi 404. Bạn có thể tự tạo tương tự ManageRooms nhé! */}
        </Route>

        {/* Bắt lỗi 404 (Trang không tồn tại) */}
        <Route
          path="*"
          element={
            <h2 className="text-center mt-5 text-danger fw-bold">
              404 - Không tìm thấy trang
            </h2>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
