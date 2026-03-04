import api from "./api";

export const bookingService = {
  // CUSTOMER: Tạo đơn đặt phòng mới (BookingRequest)
  createBooking: async (bookingRequest) => {
    const response = await api.post("/customer/bookings", bookingRequest);
    return response.data;
  },

  // CUSTOMER: Xem lịch sử đặt phòng cá nhân
  getMyBookings: async () => {
    const response = await api.get("/customer/bookings");
    return response.data;
  },

  // STAFF: Xem toàn bộ đơn đặt phòng của hệ thống
  getAllBookings: async () => {
    const response = await api.get("/staff/bookings");
    return response.data;
  },
};
