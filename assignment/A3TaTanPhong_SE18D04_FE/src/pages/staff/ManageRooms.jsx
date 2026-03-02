import React, { useEffect, useState } from "react";
import { Container, Table, Button, Modal, Form, Badge } from "react-bootstrap";
import { useRooms } from "../../hooks/useRooms";
import { formatCurrency } from "../../utils/formatCurrency";
import LoadingSpinner from "../../components/ui/LoadingSpinner";
import ConfirmModal from "../../components/modals/ConfirmModal";

const ManageRooms = () => {
  const {
    rooms,
    roomTypes,
    loading,
    fetchRooms,
    fetchRoomTypes,
    handleSaveRoom,
    handleDeleteRoom,
  } = useRooms();

  const [showModal, setShowModal] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedRoomId, setSelectedRoomId] = useState(null);
  const [formData, setFormData] = useState({
    roomNumber: "",
    roomTypeId: "", // Lưu ID loại phòng được chọn
    roomStatus: 1,
    roomPricePerDay: 0,
    roomMaxCapacity: 2,
    roomDetailDescription: "",
  });

  useEffect(() => {
    fetchRooms();
    fetchRoomTypes(); // Gọi lấy danh sách loại phòng khi load trang
  }, [fetchRooms, fetchRoomTypes]);

  const handleOpenModal = (room = null) => {
    if (room) {
      setFormData({
        ...room,
        roomTypeId: room.roomType?.roomTypeId || "", // Gán ID loại phòng nếu đang edit
      });
    } else {
      setFormData({
        roomNumber: "",
        roomTypeId: "",
        roomStatus: 1,
        roomPricePerDay: 0,
        roomMaxCapacity: 2,
        roomDetailDescription: "",
      });
    }
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Chuyển đổi roomTypeId về object nếu backend yêu cầu object RoomType
    const payload = {
      ...formData,
      roomType: { roomTypeId: parseInt(formData.roomTypeId) },
    };
    const success = await handleSaveRoom(payload);
    if (success) setShowModal(false);
  };

  if (loading) return <LoadingSpinner />;

  return (
    <Container className="py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">Quản Lý Phòng</h2>
        <Button variant="primary" onClick={() => handleOpenModal()}>
          + Thêm Phòng Mới
        </Button>
      </div>

      <Table striped bordered hover responsive className="shadow-sm">
        <thead className="table-dark">
          <tr>
            <th>Số Phòng</th>
            <th>Loại Phòng</th>
            <th>Sức Chứa</th>
            <th>Giá/Ngày</th>
            <th>Trạng Thái</th>
            <th>Thao Tác</th>
          </tr>
        </thead>
        <tbody>
          {rooms.map((room) => (
            <tr key={room.roomId}>
              <td>{room.roomNumber}</td>
              <td>{room.roomType?.roomTypeName || "N/A"}</td>
              <td>{room.roomMaxCapacity} người</td>
              <td>{formatCurrency(room.roomPricePerDay)}</td>
              <td>
                <Badge bg={room.roomStatus === 1 ? "success" : "danger"}>
                  {room.roomStatus === 1 ? "Hoạt động" : "Bảo trì"}
                </Badge>
              </td>
              <td>
                <Button
                  variant="warning"
                  size="sm"
                  className="me-2"
                  onClick={() => handleOpenModal(room)}
                >
                  Sửa
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => {
                    setSelectedRoomId(room.roomId);
                    setShowConfirm(true);
                  }}
                >
                  Xóa
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal Thêm/Sửa Phòng */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Form onSubmit={handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>
              {formData.roomId ? "Cập Nhật Phòng" : "Thêm Phòng Mới"}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Số Phòng</Form.Label>
              <Form.Control
                type="text"
                value={formData.roomNumber}
                onChange={(e) =>
                  setFormData({ ...formData, roomNumber: e.target.value })
                }
                required
              />
            </Form.Group>

            {/* Select RoomType thay thế cho Input Text */}
            <Form.Group className="mb-3">
              <Form.Label>Loại Phòng</Form.Label>
              <Form.Select
                value={formData.roomTypeId}
                onChange={(e) =>
                  setFormData({ ...formData, roomTypeId: e.target.value })
                }
                required
              >
                <option value="">-- Chọn loại phòng --</option>
                {roomTypes.map((type) => (
                  <option key={type.roomTypeId} value={type.roomTypeId}>
                    {type.roomTypeName}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Giá Thuê (VND)</Form.Label>
              <Form.Control
                type="number"
                value={formData.roomPricePerDay}
                onChange={(e) =>
                  setFormData({ ...formData, roomPricePerDay: e.target.value })
                }
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Sức Chứa Tối Đa</Form.Label>
              <Form.Control
                type="number"
                value={formData.roomMaxCapacity}
                onChange={(e) =>
                  setFormData({ ...formData, roomMaxCapacity: e.target.value })
                }
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Mô Tả Chi Tiết</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={formData.roomDetailDescription}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    roomDetailDescription: e.target.value,
                  })
                }
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Trạng Thái</Form.Label>
              <Form.Select
                value={formData.roomStatus}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    roomStatus: parseInt(e.target.value),
                  })
                }
              >
                <option value={1}>Hoạt động</option>
                <option value={0}>Đang bảo trì</option>
              </Form.Select>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Hủy
            </Button>
            <Button variant="primary" type="submit">
              Lưu Lại
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      <ConfirmModal
        show={showConfirm}
        onHide={() => setShowConfirm(false)}
        onConfirm={() => {
          handleDeleteRoom(selectedRoomId);
          setShowConfirm(false);
        }}
        title="Xác nhận xóa"
        message="Bạn có chắc chắn muốn xóa phòng này?"
      />
    </Container>
  );
};

export default ManageRooms;
