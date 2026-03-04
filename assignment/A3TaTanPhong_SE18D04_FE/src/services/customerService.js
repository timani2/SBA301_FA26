import api from "./api";

export const customerService = {
  // STAFF: Lấy danh sách tất cả khách hàng
  getAllCustomers: async () => {
    const response = await api.get("/staff/customers");
    return response.data;
  },

  // STAFF: Lấy thông tin khách hàng theo ID
  getCustomerById: async (id) => {
    const response = await api.get(`/staff/customers/${id}`);
    return response.data;
  },

  // STAFF: Xóa khách hàng
  deleteCustomer: async (id) => {
    const response = await api.delete(`/staff/customers/${id}`);
    return response.data;
  },

  // CUSTOMER: Cập nhật profile cá nhân (Sử dụng token để định danh)
  updateMyProfile: async (updateRequest) => {
    const response = await api.put("/customer/profile", updateRequest);
    return response.data;
  },

  // STAFF: Cập nhật thông tin khách hàng bất kỳ theo ID
  updateCustomer: async (id, updateRequest) => {
    const response = await api.put(`/staff/customers/${id}`, updateRequest);
    return response.data;
  },
};
