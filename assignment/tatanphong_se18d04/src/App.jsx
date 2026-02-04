import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/common/Layout";
import Home from "./pages/public/Home";
import Login from "./pages/login/Login";
import AccountManage from "./pages/admin/AccountManage";
import CategoryManage from "./pages/staff/CategoryManage";
import NewsManage from "./pages/staff/NewsManage";

// Thêm thư viện Toast
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin/accounts" element={<AccountManage />} />
          <Route path="/staff/categories" element={<CategoryManage />} />
          <Route path="/staff/news" element={<NewsManage />} />
        </Routes>
      </Layout>
      {/* Container để hiển thị Toast */}
      <ToastContainer position="top-right" autoClose={3000} />
    </Router>
  );
};

export default App;
