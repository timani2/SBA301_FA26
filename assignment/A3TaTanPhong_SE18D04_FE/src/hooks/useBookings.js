import { useState, useCallback } from "react";
import { toast } from "react-toastify";
import { bookingService } from "../services/bookingService";

export const useBookings = () => {
  const [bookings, setBookings] = useState([]); // Chứa danh sách lịch sử hoặc toàn bộ đơn
  const [loading, setLoading] = useState(false);

  // Customer: Tạo đơn đặt phòng mới
  const createBooking = async (bookingData) => {
    setLoading(true);
    try {
      await bookingService.createBooking(bookingData);
      toast.success("Đặt phòng thành công! Cảm ơn bạn đã sử dụng dịch vụ.");
      return true; // Trả về true để UI biết đường chuyển trang (ví dụ: sang trang Lịch sử)
    } catch (error) {
      console.error("Lỗi đặt phòng:", error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Customer: Xem lịch sử của bản thân
  const fetchMyHistory = useCallback(async (customerId) => {
    setLoading(true);
    try {
      const data = await bookingService.getMyHistory(customerId);
      setBookings(data);
    } catch (error) {
      console.error("Lỗi tải lịch sử đặt phòng:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Staff: Xem tất cả đơn đặt phòng của hệ thống
  const fetchAllBookings = useCallback(async () => {
    setLoading(true);
    try {
      const data = await bookingService.getAllBookings();
      setBookings(data);
    } catch (error) {
      console.error("Lỗi tải danh sách đặt phòng:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  return { bookings, loading, createBooking, fetchMyHistory, fetchAllBookings };
};
