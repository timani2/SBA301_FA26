import { useState, useCallback } from "react";
import { toast } from "react-toastify";
import { roomService } from "../services/roomService";

export const useRooms = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);

  // Lấy danh sách phòng (Dùng cho cả Khách và Staff)
  // Dùng useCallback để tránh re-render không cần thiết khi truyền xuống Component con
  const fetchRooms = useCallback(async () => {
    setLoading(true);
    try {
      const data = await roomService.getAllRooms();
      setRooms(data);
    } catch (error) {
      console.error("Lỗi tải danh sách phòng:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Staff: Thêm hoặc Cập nhật phòng
  const saveRoom = async (roomData, isEdit = false) => {
    setLoading(true);
    try {
      await roomService.saveRoom(roomData);
      toast.success(
        isEdit ? "Cập nhật phòng thành công!" : "Thêm phòng mới thành công!",
      );
      // Sau khi lưu thành công, tải lại danh sách
      fetchRooms();
      return true; // Trả về true để UI biết mà đóng Modal
    } catch (error) {
      console.error("Lỗi lưu phòng:", error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Staff: Xóa phòng (Xóa mềm)
  const deleteRoom = async (roomId) => {
    setLoading(true);
    try {
      await roomService.deleteRoom(roomId);
      toast.success("Xóa/Đổi trạng thái phòng thành công!");
      // Cập nhật lại state cục bộ thay vì gọi API lại cho nhẹ web
      setRooms((prevRooms) => prevRooms.filter((r) => r.roomId !== roomId));
    } catch (error) {
      console.error("Lỗi xóa phòng:", error);
    } finally {
      setLoading(false);
    }
  };

  return { rooms, loading, fetchRooms, saveRoom, deleteRoom };
};
