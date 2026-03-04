import api from "./api";

export const roomService = {
  getAllRooms: async () => {
    const response = await api.get("/rooms");
    return response.data;
  },

  getRoomTypes: async () => {
    const response = await api.get("/room-types");
    return response.data;
  },

  createRoom: async (roomRequest) => {
    const response = await api.post("/staff/rooms", roomRequest);
    return response.data;
  },

  updateRoom: async (id, roomRequest) => {
    const response = await api.put(`/staff/rooms/${id}`, roomRequest);
    return response.data;
  },

  // BỔ SUNG: Hàm xóa phòng
  deleteRoom: async (id) => {
    const response = await api.delete(`/staff/rooms/${id}`);
    return response.data;
  },
};
