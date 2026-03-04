import { useState, useCallback } from "react";
import { bookingService } from "../services/bookingService";
import { toast } from "react-toastify";

export const useBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);

  // Dành cho Staff: Lấy toàn bộ đơn hàng
  const fetchAllBookings = useCallback(async () => {
    setLoading(true);
    try {
      const res = await bookingService.getAllBookings();
      setBookings(res.data || []);
    } catch (error) {
      console.error("Fetch all bookings error:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Dành cho Customer: Lấy lịch sử cá nhân (Token tự xử lý email ở BE)
  const fetchMyHistory = useCallback(async () => {
    setLoading(true);
    try {
      const res = await bookingService.getMyBookings();
      setBookings(res.data || []);
    } catch (error) {
      console.error("Fetch my history error:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const createNewBooking = async (bookingData) => {
    setLoading(true);
    try {
      const res = await bookingService.createBooking(bookingData);
      toast.success(res.message || "Đặt phòng thành công!");
      return res.data;
    } catch (error) {
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    bookings,
    loading,
    fetchAllBookings,
    fetchMyHistory,
    createBooking: createNewBooking,
  };
};
