import React, { useEffect, useState } from "react";
import { Container, Table, Button, Badge } from "react-bootstrap";
import { useRooms } from "../../hooks/useRooms";
import { formatCurrency } from "../../utils/formatCurrency";
import LoadingSpinner from "../../components/ui/LoadingSpinner";
import ConfirmModal from "../../components/modals/ConfirmModal";
import RoomModal from "../../components/modals/RoomModal";

const ManageRooms = () => {
  const { rooms, loading, fetchRooms, deleteRoom, saveRoom } = useRooms();

  // State quản lý việc hiển thị hộp thoại xác nhận xóa
  const [showDelete, setShowDelete] = useState(false);
  const [selectedRoomId, setSelectedRoomId] = useState(null);

  // modal thêm / sửa phòng
  const [showForm, setShowForm] = useState(false);
  const [editingRoom, setEditingRoom] = useState(null);

  useEffect(() => {
    fetchRooms();
  }, [fetchRooms]);

  const handleDeleteClick = (id) => {
    setSelectedRoomId(id);
    setShowDelete(true);
  };

  const handleEditClick = (room) => {
    setEditingRoom(room);
    setShowForm(true);
  };

  const handleAddClick = () => {
    setEditingRoom(null);
    setShowForm(true);
  };

  const handleSaveRoom = async (roomData) => {
    // saveRoom trả về true nếu thành công
    const isEdit = !!roomData.roomId;
    const ok = await saveRoom(roomData, isEdit);
    if (ok) {
      fetchRooms(); // refresh list after change
    }
    return ok;
  };

  const confirmDelete = async () => {
    if (selectedRoomId) {
      await deleteRoom(selectedRoomId);
    }
    setShowDelete(false);
  };

  if (loading && rooms.length === 0)
    return <LoadingSpinner text="Đang tải dữ liệu quản lý..." />;

  return (
    <Container className="py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="fw-bold">Quản Lý Phòng</h3>
        <Button variant="primary" onClick={handleAddClick}>
          Thêm Phòng Mới
        </Button>
      </div>

      <Table
        striped
        bordered
        hover
        responsive
        className="align-middle shadow-sm"
      >
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Số Phòng</th>
            <th>Loại Phòng</th>
            <th>Sức Chứa</th>
            <th>Giá / Ngày</th>
            <th>Trạng Thái</th>
            <th className="text-center">Hành Động</th>
          </tr>
        </thead>
        <tbody>
          {rooms.map((room) => (
            <tr key={room.roomId}>
              <td>{room.roomId}</td>
              <td className="fw-bold">{room.roomNumber}</td>
              <td>
                {room.roomType?.roomTypeName ||
                  room.roomTypeName ||
                  "Tiêu chuẩn"}
              </td>
              <td>{room.roomMaxCapacity}</td>
              <td className="text-danger fw-bold">
                {formatCurrency(room.roomPricePerDay)}
              </td>
              <td>
                <Badge bg={room.roomStatus === 1 ? "success" : "secondary"}>
                  {room.roomStatus === 1 ? "Active" : "Inactive"}
                </Badge>
              </td>
              <td className="text-center">
                <Button
                  variant="outline-warning"
                  size="sm"
                  className="me-2"
                  onClick={() => handleEditClick(room)}
                >
                  Sửa
                </Button>
                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={() => handleDeleteClick(room.roomId)}
                >
                  Xóa
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Hộp thoại xác nhận xóa sử dụng Component dùng chung */}
      <ConfirmModal
        show={showDelete}
        handleClose={() => setShowDelete(false)}
        handleConfirm={confirmDelete}
        title="Xác nhận xóa phòng"
        body={`Bạn có chắc chắn muốn xóa/đổi trạng thái phòng ID: ${selectedRoomId} không?`}
      />

      {/* Modal thêm/sửa phòng */}
      <RoomModal
        show={showForm}
        handleClose={() => setShowForm(false)}
        initialData={editingRoom}
        typeOptions={[
          ...new Set(rooms.map((r) => r.roomTypeName).filter(Boolean)),
        ]}
        onSave={handleSaveRoom}
      />
    </Container>
  );
};

export default ManageRooms;
