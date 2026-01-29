import axios from "axios";

const API_URL = "http://localhost:8080/orchids";
const CATEGORY_URL = "http://localhost:8080/categories";

export const OrchidService = {
  getAllOrchids: async () => {
    const response = await axios.get(API_URL);
    return response.data;
  },

  getAllCategories: async () => {
    const response = await axios.get(CATEGORY_URL);
    return response.data;
  },

  getOrchidById: async (id) => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  },

  createOrchid: async (orchid) => {
    return await axios.post(API_URL, orchid);
  },

  updateOrchid: async (id, orchid) => {
    return await axios.put(`${API_URL}/${id}`, orchid);
  },

  deleteOrchid: async (id) => {
    return await axios.delete(`${API_URL}/${id}`);
  },
};

// Export thêm để tương thích với các code cũ
export const fetchOrchids = OrchidService.getAllOrchids;
export const fetchOrchidById = OrchidService.getOrchidById;
