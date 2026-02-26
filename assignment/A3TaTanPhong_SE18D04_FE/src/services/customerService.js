import api from "./api";

export const customerService = {
  // Staff: Lấy danh sách toàn bộ khách hàng
  getAllCustomers: async () => {
    const response = await api.get("/customers");
    return response.data;
  },

  // Customer / Staff: Cập nhật thông tin cá nhân
  updateProfile: async (id, customerData) => {
    const response = await api.put(`/customers/profile/${id}`, customerData);
    return response.data;
  },
};
