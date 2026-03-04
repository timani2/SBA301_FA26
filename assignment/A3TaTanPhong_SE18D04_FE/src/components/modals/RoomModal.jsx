import { Modal, Button, Form } from "react-bootstrap";
import { useState, useEffect } from "react";
import { formatCurrency } from "../../utils/formatCurrency";

const RoomModal = ({ show, handleClose, handleSave, room, roomTypes }) => {
  const [formData, setFormData] = useState({
    roomNumber: "",
    roomTypeId: "",
    status: "AVAILABLE",
  });

  useEffect(() => {
    if (show) {
      if (room) {
        const roomTypeId =
          room.roomTypeId ??
          roomTypes?.find((t) => t.typeName === room.roomTypeName)?.roomTypeId ??
          "";
        setFormData({
          roomNumber: room.roomNumber || "",
          roomTypeId: String(roomTypeId),
          status: room.status || "AVAILABLE",
        });
      } else {
        setFormData({ roomNumber: "", roomTypeId: "", status: "AVAILABLE" });
      }
    }
  }, [room, roomTypes, show]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = () => {
    if (!formData.roomNumber || !formData.roomTypeId) {
      alert("Vui lòng nhập số phòng và chọn loại phòng!");
      return;
    }
    handleSave(formData);
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          {room ? `Sửa phòng ${room.roomNumber}` : "Thêm phòng mới"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3 text-start">
            <Form.Label className="fw-bold">Số phòng</Form.Label>
            <Form.Control
              name="roomNumber"
              value={formData.roomNumber}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3 text-start">
            <Form.Label className="fw-bold">Loại phòng</Form.Label>
            <Form.Select
              name="roomTypeId"
              value={formData.roomTypeId}
              onChange={handleChange}
            >
              <option value="">-- Chọn loại phòng --</option>
              {Array.isArray(roomTypes) &&
                roomTypes.map((type) => (
                  <option key={type.roomTypeId} value={type.roomTypeId}>
                    {type.typeName} ({formatCurrency(type.price)})
                  </option>
                ))}
            </Form.Select>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Hủy
        </Button>
        <Button variant="primary" onClick={onSubmit}>
          {room ? "Lưu thay đổi" : "Tạo mới"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RoomModal;
