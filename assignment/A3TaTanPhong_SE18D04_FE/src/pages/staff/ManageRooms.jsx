import { useState, useEffect } from "react";
import { Table, Button, Badge } from "react-bootstrap";
import { useRooms } from "../../hooks/useRooms";
import { roomService } from "../../services/roomService";
import { formatCurrency } from "../../utils/formatCurrency";
import RoomModal from "../../components/modals/RoomModal";
import { toast } from "react-toastify";

const ManageRooms = () => {
  const { rooms, roomTypes, loading, refreshRooms, deleteRoom } = useRooms();
  const [showModal, setShowModal] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);

  const handleShowAdd = () => {
    setSelectedRoom(null);
    setShowModal(true);
  };

  const handleShowEdit = (room) => {
    setSelectedRoom(room);
    setShowModal(true);
  };

  const handleSubmit = async (formData) => {
    try {
      let response;
      if (selectedRoom) {
        // Cập nhật: PUT /staff/rooms/{id}
        response = await roomService.updateRoom(selectedRoom.id, formData);
      } else {
        // Thêm mới: POST /staff/rooms
        response = await roomService.createRoom(formData);
      }
      toast.success(response.message || "Thao tác thành công");
      setShowModal(false);
      refreshRooms();
    } catch (error) {
      console.error("Lưu phòng thất bại:", error);
    }
  };

  if (loading) return <div>Đang tải dữ liệu phòng...</div>;

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Quản lý phòng</h2>
        <Button variant="success" onClick={handleShowAdd}>
          + Thêm phòng mới
        </Button>
      </div>

      <Table striped bordered hover responsive>
        <thead className="table-dark">
          <tr>
            <th>Số phòng</th>
            <th>Loại phòng</th>
            <th>Giá/Ngày</th>
            <th>Người lớn/Trẻ em</th>
            <th>Trạng thái</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {rooms.map((room) => (
            <tr key={room.id}>
              <td>{room.roomNumber}</td>
              <td>{room.roomType?.roomTypeName}</td>
              <td className="text-danger fw-bold">
                {formatCurrency(room.roomPricePerDay)}
              </td>
              <td>
                {room.roomMaxAdult} / {room.roomMaxChildren}
              </td>
              <td>
                <Badge
                  bg={room.roomStatus === "ACTIVE" ? "success" : "secondary"}
                >
                  {room.roomStatus}
                </Badge>
              </td>
              <td>
                <Button
                  variant="warning"
                  size="sm"
                  className="me-2"
                  onClick={() => handleShowEdit(room)}
                >
                  Sửa
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => deleteRoom(room.id)}
                >
                  Xóa
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <RoomModal
        show={showModal}
        onHide={() => setShowModal(false)}
        onSubmit={handleSubmit}
        initialData={selectedRoom}
        roomTypes={roomTypes}
      />
    </div>
  );
};

export default ManageRooms;
