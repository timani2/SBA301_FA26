import axios from "axios";

// Cấu hình địa chỉ Backend của bạn (mặc định Spring Boot chạy cổng 8080)
const API = axios.create({
  baseURL: "http://localhost:8080/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default API;
