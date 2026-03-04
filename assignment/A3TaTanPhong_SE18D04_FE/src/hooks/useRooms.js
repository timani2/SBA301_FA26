import { useState, useEffect, useCallback } from "react";
import { roomService } from "../services/roomService";

export const useRooms = () => {
  const [rooms, setRooms] = useState([]);
  const [roomTypes, setRoomTypes] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchRooms = useCallback(async () => {
    setLoading(true);
    try {
      const res = await roomService.getAllRooms();
      // Backend trả về { message: "...", data: [...] }
      setRooms(res.data || []);
    } catch (error) {
      console.error("Lỗi khi tải danh sách phòng:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchRoomTypes = useCallback(async () => {
    try {
      const res = await roomService.getRoomTypes();
      setRoomTypes(res.data || []);
    } catch (error) {
      console.error("Lỗi khi tải loại phòng:", error);
    }
  }, []);

  useEffect(() => {
    fetchRooms();
    fetchRoomTypes();
  }, [fetchRooms, fetchRoomTypes]);

  return { rooms, roomTypes, loading, refreshRooms: fetchRooms };
};
