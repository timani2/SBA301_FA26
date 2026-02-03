import API from "./api";

export const newsService = {
  getAll: (accountID) => API.get(`/news/history/${accountID}`),
  getPublicNews: () => API.get("/news/active"),
  create: (data) => API.post("/news", data), // Hàm tạo mới
  update: (id, data) => API.put(`/news/${id}`, data),
  delete: (id) => API.delete(`/news/${id}`),
};
