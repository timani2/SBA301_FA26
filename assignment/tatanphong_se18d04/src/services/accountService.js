import API from "./api";

export const accountService = {
  // Lấy toàn bộ danh sách tài khoản
  getAll: () => API.get("/accounts"),

  // Tạo tài khoản mới
  create: (data) => API.post("/accounts", data),

  // Cập nhật tài khoản
  update: (id, data) => API.put(`/accounts/${id}`, data),

  // Xóa tài khoản (Backend đã có check ràng buộc không cho xóa nếu có bài viết)
  delete: (id) => API.delete(`/accounts/${id}`),

  // Tìm kiếm tài khoản theo keyword
  search: (keyword) => API.get(`/accounts/search?keyword=${keyword}`),
};
