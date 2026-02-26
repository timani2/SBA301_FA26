import api from "./api";

export const roomService = {
  // Public: Xem danh sách phòng (Không cần token)
  getAllRooms: async () => {
    const response = await api.get("/rooms");
    return response.data;
  },

  // Staff: Thêm hoặc Cập nhật phòng
  saveRoom: async (roomData) => {
    const response = await api.post("/rooms", roomData);
    return response.data;
  },

  // Staff: Xóa phòng (Xóa mềm hoặc xóa cứng do Backend xử lý)
  deleteRoom: async (roomId) => {
    const response = await api.delete(`/rooms/${roomId}`);
    return response.data;
  },
};
