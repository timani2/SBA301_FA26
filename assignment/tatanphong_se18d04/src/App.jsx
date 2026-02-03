import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Layout from "./components/common/Layout";
import Home from "./pages/public/Home";
import Login from "./pages/login/Login";
import AccountManage from "./pages/admin/AccountManage";
import CategoryManage from "./pages/staff/CategoryManage";
import NewsManage from "./pages/staff/NewsManage";

// 1. Component bảo vệ đường dẫn (Private Route)
const ProtectedRoute = ({ children, allowedRole }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    // Nếu chưa đăng nhập, đá về trang Login
    return <Navigate to="/login" replace />;
  }

  if (allowedRole && user.accountRole !== allowedRole) {
    // Nếu sai Role (ví dụ Staff vào Admin), đá về Home
    return <Navigate to="/" replace />;
  }

  return children;
};

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          {/* Public Route: Khách vãng lai xem tin tức [cite: 34] */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />

          {/* Admin Routes (Role = 1) [cite: 30, 38] */}
          <Route
            path="/admin/accounts"
            element={
              <ProtectedRoute allowedRole={1}>
                <AccountManage />
              </ProtectedRoute>
            }
          />

          {/* Staff Routes (Role = 2) [cite: 30, 39, 45] */}
          <Route
            path="/staff/categories"
            element={
              <ProtectedRoute allowedRole={2}>
                <CategoryManage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/staff/news"
            element={
              <ProtectedRoute allowedRole={2}>
                <NewsManage />
              </ProtectedRoute>
            }
          />

          {/* Trang báo lỗi 404 hoặc Redirect mặc định */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
