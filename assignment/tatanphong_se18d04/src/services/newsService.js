import API from "./api";

export const newsService = {
  // Xem tin tức công khai (status active) [cite: 34]
  getPublicNews: () => API.get("/news/active"),

  // Lấy tất cả bài viết (cho trang quản lý của Staff)
  getAll: () => API.get("/news"),

  // Xem lịch sử bài viết của chính Staff đang đăng nhập [cite: 49]
  getHistory: (staffId) => API.get(`/news/history/${staffId}`),

  create: (data) => API.post("/news", data),
  update: (id, data) => API.put(`/news/${id}`, data),
  delete: (id) => API.delete(`/news/${id}`),
  search: (keyword) => API.get(`/news/search?keyword=${keyword}`),
};
