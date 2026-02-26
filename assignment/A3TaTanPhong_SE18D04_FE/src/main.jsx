import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

// IMPORT BẮT BUỘC ĐỂ GIAO DIỆN HOẠT ĐỘNG
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

// IMPORT AUTH CONTEXT ĐỂ QUẢN LÝ ĐĂNG NHẬP
import { AuthProvider } from "./contexts/AuthContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>,
);
