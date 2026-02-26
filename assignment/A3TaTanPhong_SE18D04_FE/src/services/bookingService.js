import api from "./api";

const bookingService = {
  // Lấy tất cả đơn (Staff) - backend cung cấp GET /api/bookings
  getAllBookings: async () => {
    const response = await api.get("/bookings");
    return response.data;
  },

  // Lấy lịch sử của khách hàng theo id
  getMyHistory: async (customerId) => {
    const response = await api.get(`/bookings/my-history/${customerId}`);
    return response.data;
  },

  // Cập nhật trạng thái (Staff)
  updateBookingStatus: async (id, status) => {
    const response = await api.put(`/bookings/${id}/status?status=${status}`);
    return response.data;
  },

  // Tạo đơn mới (Customer)
  createBooking: async (bookingData) => {
    const response = await api.post("/bookings", bookingData);
    return response.data;
  },
};

export default bookingService; // Xuất mặc định
