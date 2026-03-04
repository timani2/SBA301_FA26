import { useState, useEffect } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";

const RoomModal = ({ show, onHide, onSubmit, initialData, roomTypes }) => {
  const [formData, setFormData] = useState({
    roomNumber: "",
    roomDescription: "",
    roomMaxAdult: 1,
    roomMaxChildren: 0,
    roomPricePerDay: 0,
    roomTypeId: "",
    roomStatus: "ACTIVE",
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        roomNumber: initialData.roomNumber || "",
        roomDescription: initialData.roomDescription || "",
        roomMaxAdult: initialData.roomMaxAdult || 1,
        roomMaxChildren: initialData.roomMaxChildren || 0,
        roomPricePerDay: initialData.roomPricePerDay || 0,
        roomTypeId: initialData.roomType?.id || "",
        roomStatus: initialData.roomStatus || "ACTIVE",
      });
    } else {
      setFormData({
        roomNumber: "",
        roomDescription: "",
        roomMaxAdult: 1,
        roomMaxChildren: 0,
        roomPricePerDay: 0,
        roomTypeId: roomTypes[0]?.id || "",
        roomStatus: "ACTIVE",
      });
    }
  }, [initialData, roomTypes, show]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>
            {initialData ? "Cập nhật phòng" : "Thêm phòng mới"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Số phòng</Form.Label>
                <Form.Control
                  name="roomNumber"
                  value={formData.roomNumber}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Loại phòng</Form.Label>
                <Form.Select
                  name="roomTypeId"
                  value={formData.roomTypeId}
                  onChange={handleChange}
                  required
                >
                  <option value="">-- Chọn loại phòng --</option>
                  {roomTypes.map((type) => (
                    <option key={type.id} value={type.id}>
                      {type.roomTypeName}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3">
            <Form.Label>Mô tả phòng</Form.Label>
            <Form.Control
              as="textarea"
              rows={2}
              name="roomDescription"
              value={formData.roomDescription}
              onChange={handleChange}
            />
          </Form.Group>

          <Row>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Người lớn (Tối đa)</Form.Label>
                <Form.Control
                  type="number"
                  name="roomMaxAdult"
                  value={formData.roomMaxAdult}
                  onChange={handleChange}
                  min="1"
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Trẻ em (Tối đa)</Form.Label>
                <Form.Control
                  type="number"
                  name="roomMaxChildren"
                  value={formData.roomMaxChildren}
                  onChange={handleChange}
                  min="0"
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Giá/Ngày (VND)</Form.Label>
                <Form.Control
                  type="number"
                  name="roomPricePerDay"
                  value={formData.roomPricePerDay}
                  onChange={handleChange}
                  min="0"
                />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3">
            <Form.Label>Trạng thái</Form.Label>
            <Form.Select
              name="roomStatus"
              value={formData.roomStatus}
              onChange={handleChange}
            >
              <option value="ACTIVE">Hoạt động (Active)</option>
              <option value="DELETED">Ngừng hoạt động (Deleted)</option>
            </Form.Select>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Hủy
          </Button>
          <Button variant="primary" type="submit">
            Lưu lại
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default RoomModal;
