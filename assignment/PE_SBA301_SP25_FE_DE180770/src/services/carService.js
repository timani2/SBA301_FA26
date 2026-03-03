import axios from "axios";
import authService from "./authService";

const API_URL = "http://localhost:8080/api";

// Cấu hình header chứa JWT Token cho các request cần quyền Admin
const getAuthHeader = () => {
  const token = authService.getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// Task 2: Lấy toàn bộ danh sách xe (Public - No permission)
const getAllCars = () => {
  return axios.get(`${API_URL}/cars`);
};

// Task 3.2: Lấy danh sách quốc gia để đổ vào Form.Select
const getAllCountries = () => {
  return axios.get(`${API_URL}/countries`);
};

// Task 2: Thêm mới xe (Yêu cầu quyền Admin)
const createCar = (carData) => {
  return axios.post(`${API_URL}/cars`, carData, {
    headers: getAuthHeader(),
  });
};

// Task 2: Xóa xe theo ID (Yêu cầu quyền Admin)
const deleteCar = (carID) => {
  return axios.delete(`${API_URL}/cars/${carID}`, {
    headers: getAuthHeader(),
  });
};

// Lấy chi tiết xe để cập nhật (Update)
const getCarById = (carID) => {
  return axios.get(`${API_URL}/cars/${carID}`);
};

const updateCar = (carID, carData) => {
  return axios.put(`${API_URL}/cars/${carID}`, carData, {
    headers: getAuthHeader(),
  });
};

export default {
  getAllCars,
  getAllCountries,
  createCar,
  deleteCar,
  getCarById,
  updateCar,
};
