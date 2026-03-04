import api from "./api";

export const roomService = {
  // PUBLIC: Lấy toàn bộ danh sách phòng
  getAllRooms: async () => {
    const response = await api.get("/rooms");
    return response.data;
  },

  // STAFF: Tạo phòng mới (RoomRequest)
  createRoom: async (roomRequest) => {
    const response = await api.post("/staff/rooms", roomRequest);
    return response.data;
  },

  // STAFF: Cập nhật phòng (RoomRequest)
  updateRoom: async (id, roomRequest) => {
    const response = await api.put(`/staff/rooms/${id}`, roomRequest);
    return response.data;
  },

  // STAFF: Xóa phòng
  deleteRoom: async (id) => {
    const response = await api.delete(`/staff/rooms/${id}`);
    return response.data;
  },

  // PUBLIC/STAFF: Lấy danh sách loại phòng (Nếu có RoomTypeController)
  getRoomTypes: async () => {
    const response = await api.get("/room-types");
    return response.data;
  },
};
