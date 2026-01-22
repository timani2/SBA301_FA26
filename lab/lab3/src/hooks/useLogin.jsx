// src/hooks/useLogin.jsx
// Custom hook để quản lý logic đăng nhập, bao gồm form state, validation, và xử lý submit

import { useReducer } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

// Khởi tạo trạng thái ban đầu cho form đăng nhập
const initialFormState = {
  identifier: "", // Username hoặc email
  password: "", // Mật khẩu
  errors: {}, // Lỗi validation
};

// Reducer để quản lý state của form
function formReducer(state, action) {
  switch (action.type) {
    case "SET_FIELD": // Cập nhật giá trị field
      return { ...state, [action.field]: action.value };
    case "SET_ERROR": // Thêm lỗi cho field
      return {
        ...state,
        errors: { ...state.errors, [action.field]: action.message },
      };
    case "CLEAR_ERROR": // Xóa lỗi của field
      const { [action.field]: removed, ...restErrors } = state.errors;
      return { ...state, errors: restErrors };
    case "SET_ERRORS": // Cập nhật tất cả lỗi
      return { ...state, errors: action.errors };

    case "RESET_FORM": // Reset form về trạng thái ban đầu
      return initialFormState;
    default:
      return state;
  }
}

// Hook chính để xử lý đăng nhập
export function useLogin() {
  // Sử dụng reducer cho form state
  const [formState, dispatch] = useReducer(formReducer, initialFormState);
  // Lấy các giá trị từ AuthContext
  const { login, loading, error, clearError } = useAuth();
  // Hook điều hướng
  const navigate = useNavigate();

  // Regex kiểm tra email
  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  // Hàm kiểm tra xem giá trị có phải email không
  const isEmail = (v) => v.includes("@");

  // Xử lý thay đổi input với validation real-time
  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch({ type: "SET_FIELD", field: name, value });
    clearError();

    // Validation real-time
    if (name === "identifier") {
      if (!value.trim()) {
        dispatch({
          type: "SET_ERROR",
          field: name,
          message: "Username or Email is required.",
        });
      } else if (isEmail(value) && !emailRe.test(value)) {
        dispatch({
          type: "SET_ERROR",
          field: name,
          message: "Email is invalid format.",
        });
      } else {
        dispatch({ type: "CLEAR_ERROR", field: name });
      }
    }
    if (name === "password") {
      if (!value.trim()) {
        dispatch({
          type: "SET_ERROR",
          field: name,
          message: "Password is required.",
        });
      } else {
        dispatch({ type: "CLEAR_ERROR", field: name });
      }
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!formState.identifier.trim())
      errors.identifier = "Username or Email is required.";
    else if (
      isEmail(formState.identifier) &&
      !emailRe.test(formState.identifier)
    ) {
      errors.identifier = "Email is invalid format.";
    }
    if (!formState.password.trim()) errors.password = "Password is required.";
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    clearError();
    const validationErrors = validateForm();
    dispatch({ type: "SET_ERRORS", errors: validationErrors });

    if (Object.keys(validationErrors).length > 0) return;

    try {
      const result = await login(
        formState.identifier.trim(),
        formState.password,
      );
      if (result.ok) {
        navigate("/");
      }
    } catch (err) {
      console.error("Login error:", err);
    }
  };

  const handleCancel = () => {
    dispatch({ type: "RESET_FORM" });
    clearError();
    navigate("/");
  };

  return {
    formState,
    loading,
    error,
    handleChange,
    handleSubmit,
    handleCancel,
    clearError,
  };
}
