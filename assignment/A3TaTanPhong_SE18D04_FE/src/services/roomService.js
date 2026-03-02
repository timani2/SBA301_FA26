import api from "./api";

// Lấy danh sách tất cả các phòng (Dành cho cả User và Staff)
export const getRooms = async () => {
  const response = await api.get("/rooms");
  return response.data;
};

// Lấy danh sách các loại phòng (Dùng cho dropdown select khi Staff tạo/sửa phòng)
export const getRoomTypes = async () => {
  const response = await api.get("/room-types");
  return response.data;
};

// Lưu thông tin phòng (Thêm mới nếu không có ID, Cập nhật nếu đã có ID)
export const saveRoom = async (roomData) => {
  const response = await api.post("/rooms", roomData);
  return response.data;
};

// Xóa hoặc thay đổi trạng thái phòng
export const deleteRoom = async (roomId) => {
  const response = await api.delete(`/rooms/${roomId}`);
  return response.data;
};

// Lấy chi tiết một phòng cụ thể (Nếu cần dùng cho trang chi tiết)
export const getRoomById = async (roomId) => {
  const response = await api.get(`/rooms/${roomId}`);
  return response.data;
};
