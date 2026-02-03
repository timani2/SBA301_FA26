import API from "./api";

export const categoryService = {
  getAll: () => API.get("/categories"),
  create: (data) => API.post("/categories", data),
  update: (id, data) => API.put(`/categories/${id}`, data),
  delete: (id) => API.delete(`/categories/${id}`),
  search: (keyword) => API.get(`/categories/search?keyword=${keyword}`),
};
