// src/contexts/AuthContext.jsx
import React, { createContext, useReducer, useContext, useEffect } from "react";

// 1. Tạo Context [cite: 21]
const AuthContext = createContext();

// 2. Khởi tạo trạng thái ban đầu [cite: 23]
const initialState = {
  user: null,
  loading: false,
  error: null,
  isAuthenticated: false,
};

// 3. Định nghĩa hàm reducer [cite: 30]
function authReducer(state, action) {
  switch (action.type) {
    case "LOGIN_START":
      return { ...state, loading: true, error: null };
    case "LOGIN_SUCCESS":
      return {
        ...state,
        user: action.payload,
        loading: false,
        error: null,
        isAuthenticated: true,
      };
    case "LOGIN_FAILURE":
      return {
        ...state,
        user: null,
        loading: false,
        error: action.payload,
        isAuthenticated: false,
      };
    case "LOGOUT":
      return {
        ...state,
        user: null,
        loading: false,
        error: null,
        isAuthenticated: false,
      };
    case "CLEAR_ERROR":
      return { ...state, error: null };
    default:
      return state;
  }
}

// 4. Tạo Provider Component [cite: 72]
export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      dispatch({ type: "LOGIN_SUCCESS", payload: user });
    }
  }, []);

  // 5. Dữ liệu mẫu thay thế cho API call [cite: 75]
  const mockAccounts = [
    {
      id: 1,
      username: "admin",
      email: "admin@example.com",
      password: "123456",
      role: "admin",
      status: "active",
      // Thêm avatar để tương thích với Header cũ
      avatar:
        "https://cdn2.fptshop.com.vn/unsafe/800x0/meme_cho_1_e568e5b1a5.jpg",
    },
    {
      id: 2,
      username: "user1",
      email: "user1@example.com",
      password: "123456",
      role: "user",
      status: "active",
      avatar:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6rGOpjOkdhp2dqkuRM1loQjvEPyjZSZM6yA&s",
    },
    {
      id: 3,
      username: "user2",
      email: "user2@example.com",
      password: "123456",
      role: "user",
      status: "locked",
      avatar:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIeQKLDKkmFXYQFuWHnXrqid0QvwtMC2tmfA&s",
    },
  ];

  // 6. Hàm đăng nhập (thay thế API call bằng mock data) [cite: 102]
  function login(identifier, password) {
    dispatch({ type: "LOGIN_START" });

    return new Promise((resolve) => {
      setTimeout(() => {
        const isEmail = identifier.includes("@");

        // Tìm kiếm tài khoản
        const account = mockAccounts.find((acc) => {
          if (isEmail) {
            return acc.email === identifier && acc.password === password;
          } else {
            return acc.username === identifier && acc.password === password;
          }
        });

        if (!account) {
          dispatch({
            type: "LOGIN_FAILURE",
            payload: "Invalid credentials.",
          });
          resolve({ ok: false, message: "Invalid credentials." });
          return;
        }

        if (account.status === "locked") {
          dispatch({
            type: "LOGIN_FAILURE",
            payload: "Account is locked. Please contact administrator.",
          });
          resolve({
            ok: false,
            message: "Account is locked. Please contact administrator.",
          });
          return;
        }

        if (account.role !== "admin") {
          dispatch({
            type: "LOGIN_FAILURE",
            payload: "Access denied. Only admin users can login",
          });
          resolve({
            ok: false,
            message: "Access denied. Only admin users can login",
          });
          return;
        }

        const userInfo = { ...account }; // Copy toàn bộ info bao gồm avatar
        dispatch({ type: "LOGIN_SUCCESS", payload: userInfo });
        localStorage.setItem("user", JSON.stringify(userInfo));
        resolve({ ok: true, account: userInfo });
      }, 500);
    });
  }

  function logout() {
    dispatch({ type: "LOGOUT" });
    localStorage.removeItem("user");
  }

  function clearError() {
    dispatch({ type: "CLEAR_ERROR" });
  }

  const contextValue = {
    user: state.user,
    loading: state.loading,
    error: state.error,
    isAuthenticated: state.isAuthenticated,
    login,
    logout,
    clearError,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}

// Custom hook [cite: 182]
export function useAuth() {
  return useContext(AuthContext);
}

export default AuthContext;
