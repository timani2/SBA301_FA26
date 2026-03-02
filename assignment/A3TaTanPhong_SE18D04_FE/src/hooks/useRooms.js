import { useState, useCallback } from "react";
import {
  getRooms,
  saveRoom,
  deleteRoom,
  getRoomTypes,
} from "../services/roomService";
import { toast } from "react-toastify";

export const useRooms = () => {
  const [rooms, setRooms] = useState([]);
  const [roomTypes, setRoomTypes] = useState([]); // Trạng thái lưu danh sách loại phòng
  const [loading, setLoading] = useState(false);

  // Lấy danh sách phòng
  const fetchRooms = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getRooms();
      setRooms(data);
    } catch (error) {
      console.error("Lỗi fetch rooms:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Lấy danh sách loại phòng để Staff chọn
  const fetchRoomTypes = useCallback(async () => {
    try {
      const data = await getRoomTypes();
      setRoomTypes(data);
    } catch (error) {
      console.error("Lỗi fetch room types:", error);
    }
  }, []);

  // Thêm hoặc cập nhật phòng
  const handleSaveRoom = async (roomData) => {
    try {
      await saveRoom(roomData);
      toast.success("Lưu thông tin phòng thành công!");
      await fetchRooms();
      return true;
    } catch (error) {
      return false;
    }
  };

  // Xóa hoặc đổi trạng thái phòng
  const handleDeleteRoom = async (roomId) => {
    try {
      await deleteRoom(roomId);
      toast.success("Đã xử lý xóa phòng!");
      await fetchRooms();
    } catch (error) {
      // Lỗi xử lý bởi interceptor
    }
  };

  return {
    rooms,
    roomTypes, // Trả về danh sách loại phòng cho UI
    loading,
    fetchRooms,
    fetchRoomTypes, // Trả về hàm fetch cho UI
    handleSaveRoom,
    handleDeleteRoom,
  };
};
