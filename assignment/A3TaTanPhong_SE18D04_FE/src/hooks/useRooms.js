import { useState, useEffect, useCallback } from "react";
import { roomService } from "../services/roomService";

export const useRooms = () => {
  const [rooms, setRooms] = useState([]);
  const [roomTypes, setRoomTypes] = useState([]);
  const [loading, setLoading] = useState(false);

  // SỬA TẠI ĐÂY: Dùng useCallback để giữ tham chiếu hàm ổn định
  const fetchRooms = useCallback(async () => {
    setLoading(true);
    try {
      const res = await roomService.getAllRooms();
      // Backend trả về ApiResponse { data: List<RoomResponse> }
      setRooms(res.data || []);
    } catch (error) {
      console.error("Lỗi khi tải danh sách phòng:", error);
    } finally {
      setLoading(false);
    }
  }, []); // Dependency array trống giúp hàm không bị tạo lại khi re-render

  const fetchRoomTypes = useCallback(async () => {
    try {
      const res = await roomService.getRoomTypes();
      setRoomTypes(res.data || []);
    } catch (error) {
      console.error("Lỗi khi tải loại phòng:", error);
    }
  }, []);

  // Tự động load dữ liệu lần đầu khi hook được sử dụng
  useEffect(() => {
    fetchRooms();
    fetchRoomTypes();
  }, [fetchRooms, fetchRoomTypes]); // Dependency ổn định nhờ useCallback

  return {
    rooms,
    roomTypes,
    loading,
    refreshRooms: fetchRooms,
  };
};
