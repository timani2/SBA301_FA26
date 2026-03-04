import { Container, Table, Button, Badge } from "react-bootstrap";
import { useState } from "react";
import { useRooms } from "../../hooks/useRooms";
import { roomService } from "../../services/roomService";
import RoomModal from "../../components/modals/RoomModal";
import LoadingSpinner from "../../components/ui/LoadingSpinner";
import { formatCurrency } from "../../utils/formatCurrency";
import { toast } from "react-toastify";

const ManageRooms = () => {
  const { rooms, roomTypes, loading, refreshRooms } = useRooms();
  const [showModal, setShowModal] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);

  const handleSaveRoom = async (formData) => {
    try {
      const roomRequest = {
        roomNumber: formData.roomNumber,
        roomTypeId: parseInt(formData.roomTypeId), // Khớp với Long roomTypeId ở BE
      };

      if (selectedRoom) {
        await roomService.updateRoom(selectedRoom.roomId, roomRequest);
        toast.success("Cập nhật phòng thành công!");
      } else {
        await roomService.createRoom(roomRequest);
        toast.success("Thêm phòng mới thành công!");
      }
      setShowModal(false);
      refreshRooms();
    } catch (error) {
      console.error("Lỗi khi lưu phòng:", error);
    }
  };

  const handleDelete = async (roomId, roomNumber) => {
    if (window.confirm(`Bạn có chắc muốn xóa phòng ${roomNumber}?`)) {
      try {
        await roomService.deleteRoom(roomId);
        toast.success("Xóa thành công!");
        refreshRooms();
      } catch (error) {
        console.error("Lỗi khi xóa:", error);
      }
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <Container className="py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3>Quản lý danh sách phòng</h3>
        <Button
          variant="primary"
          onClick={() => {
            setSelectedRoom(null);
            setShowModal(true);
          }}
        >
          Thêm phòng mới
        </Button>
      </div>

      <Table striped bordered hover responsive>
        <thead className="table-dark text-center">
          <tr>
            <th>Số phòng</th>
            <th>Loại phòng</th>
            <th>Giá/Ngày</th>
            <th>Trạng thái</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {rooms?.map((room) => (
            <tr key={room.roomId} className="text-center align-middle">
              <td>{room.roomNumber}</td>
              <td>{room.roomTypeName}</td>
              <td className="fw-bold text-danger">
                {formatCurrency(room.price)}
              </td>
              <td>
                <Badge bg={room.status === "AVAILABLE" ? "success" : "danger"}>
                  {room.status === "AVAILABLE" ? "Trống" : "Đã đặt"}
                </Badge>
              </td>
              <td>
                <Button
                  variant="outline-primary"
                  size="sm"
                  className="me-2"
                  onClick={() => {
                    setSelectedRoom(room);
                    setShowModal(true);
                  }}
                >
                  Sửa
                </Button>
                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={() => handleDelete(room.roomId, room.roomNumber)}
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
        handleClose={() => setShowModal(false)}
        handleSave={handleSaveRoom}
        room={selectedRoom}
        roomTypes={roomTypes}
      />
    </Container>
  );
};

export default ManageRooms;
