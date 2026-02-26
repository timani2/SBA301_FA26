import api from "./api";

export const bookingService = {
  // Customer: Tạo đơn đặt phòng mới
  createBooking: async (bookingData) => {
    const response = await api.post("/bookings", bookingData);
    return response.data;
  },

  // Customer: Xem lịch sử đặt phòng của chính mình
  getMyHistory: async (customerId) => {
    const response = await api.get(`/bookings/my-history/${customerId}`);
    return response.data;
  },

  // Staff: Quản lý tất cả đơn đặt phòng trong hệ thống
  getAllBookings: async () => {
    const response = await api.get("/bookings");
    return response.data;
  },
};
