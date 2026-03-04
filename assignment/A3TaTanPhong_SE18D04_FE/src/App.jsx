import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { useAuth } from "./hooks/useAuth";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Lớp Layout chung
import MainLayout from "./components/common/MainLayout";

// Các trang công khai (Public)
import Home from "./pages/public/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

// Các trang dành cho Khách hàng (Customer)
import Profile from "./pages/customer/Profile";
import BookingHistory from "./pages/customer/BookingHistory";
import CreateBooking from "./pages/customer/CreateBooking";

// Các trang dành cho Nhân viên (Staff)
import ManageRooms from "./pages/staff/ManageRooms";
import ManageCustomers from "./pages/staff/ManageCustomers";
import ManageBookings from "./pages/staff/ManageBookings";

/**
 * Component bảo vệ Route dựa trên trạng thái đăng nhập và vai trò (Role).
 * Khớp với logic Role từ AuthResponse của Backend (STAFF/CUSTOMER).
 */
const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="text-center mt-5">Đang kiểm tra quyền truy cập...</div>
    );
  }

  // Nếu chưa đăng nhập, đẩy về trang Login
  if (!user || !user.token) {
    return <Navigate to="/login" replace />;
  }

  // Nếu vai trò không phù hợp, đẩy về trang chủ
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Mọi Route đều nằm trong MainLayout để có Header và Footer chung */}
          <Route element={<MainLayout />}>
            {/* --- PUBLIC ROUTES --- */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* --- CUSTOMER ROUTES --- */}
            <Route
              path="/customer/profile"
              element={
                <ProtectedRoute allowedRoles={["ROLE_CUSTOMER"]}>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/customer/bookings"
              element={
                <ProtectedRoute allowedRoles={["ROLE_CUSTOMER"]}>
                  <BookingHistory />
                </ProtectedRoute>
              }
            />
            <Route
              path="/customer/create-booking"
              element={
                <ProtectedRoute allowedRoles={["ROLE_CUSTOMER"]}>
                  <CreateBooking />
                </ProtectedRoute>
              }
            />

            {/* --- STAFF ROUTES --- */}
            <Route
              path="/staff/rooms"
              element={
                <ProtectedRoute allowedRoles={["ROLE_STAFF"]}>
                  <ManageRooms />
                </ProtectedRoute>
              }
            />
            <Route
              path="/staff/customers"
              element={
                <ProtectedRoute allowedRoles={["ROLE_STAFF"]}>
                  <ManageCustomers />
                </ProtectedRoute>
              }
            />
            <Route
              path="/staff/bookings"
              element={
                <ProtectedRoute allowedRoles={["ROLE_STAFF"]}>
                  <ManageBookings />
                </ProtectedRoute>
              }
            />
          </Route>

          {/* Nếu truy cập đường dẫn không tồn tại, quay về trang chủ */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>

      {/* Container hiển thị các thông báo Toast từ API và Services */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        theme="colored"
      />
    </AuthProvider>
  );
}

export default App;
