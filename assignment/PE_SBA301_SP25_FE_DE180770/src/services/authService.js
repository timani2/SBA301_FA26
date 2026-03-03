import axios from "axios";

const API_URL = "http://localhost:8080/api/auth";

const login = async (memberID, password) => {
  const response = await axios.post(`${API_URL}/login`, {
    memberID,
    password,
  });

  if (response.data.token) {
    // Task 1: Lưu trữ thông tin đăng nhập vào localStorage
    localStorage.setItem("token", response.data.token);
    localStorage.setItem("memberID", response.data.memberID);
    localStorage.setItem("role", response.data.role.toString());
  }
  return response.data;
};

const logout = () => {
  localStorage.clear();
};

const getCurrentUserRole = () => {
  return localStorage.getItem("role");
};

const getToken = () => {
  return localStorage.getItem("token");
};

export default {
  login,
  logout,
  getCurrentUserRole,
  getToken,
};
