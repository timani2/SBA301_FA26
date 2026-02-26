import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";

const RoomModal = ({
  show,
  handleClose,
  initialData,
  typeOptions = [],
  onSave, // async function(data) => boolean
}) => {
  const [form, setForm] = useState({
    roomId: null,
    roomNumber: "",
    roomDetailDescription: "",
    roomMaxCapacity: "",
    roomPricePerDay: "",
    roomStatus: 1,
    roomTypeName: "",
  });

  useEffect(() => {
    if (initialData) {
      setForm({
        roomId: initialData.roomId,
        roomNumber: initialData.roomNumber || "",
        roomDetailDescription: initialData.roomDetailDescription || "",
        roomMaxCapacity: initialData.roomMaxCapacity || "",
        roomPricePerDay: initialData.roomPricePerDay || "",
        roomStatus: initialData.roomStatus != null ? initialData.roomStatus : 1,
        roomTypeName:
          (initialData.roomType && initialData.roomType.roomTypeName) ||
          initialData.roomTypeName ||
          "",
      });
    } else {
      setForm({
        roomId: null,
        roomNumber: "",
        roomDetailDescription: "",
        roomMaxCapacity: "",
        roomPricePerDay: "",
        roomStatus: 1,
        roomTypeName: "",
      });
    }
  }, [initialData, show]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (checked ? 1 : 0) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (onSave) {
      const success = await onSave(form);
      if (success) {
        handleClose();
      }
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>
            {form.roomId ? "Sửa phòng" : "Thêm phòng mới"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Số phòng</Form.Label>
            <Form.Control
              type="text"
              name="roomNumber"
              required
              value={form.roomNumber}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Loại phòng</Form.Label>
            <Form.Select
              name="roomTypeName"
              value={form.roomTypeName}
              onChange={handleChange}
              required
            >
              <option value="">-- Chọn loại --</option>
              {typeOptions.map((t, idx) => (
                <option key={idx} value={t}>
                  {t}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <Row className="mb-3">
            <Col>
              <Form.Group>
                <Form.Label>Sức chứa</Form.Label>
                <Form.Control
                  type="number"
                  name="roomMaxCapacity"
                  value={form.roomMaxCapacity}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>Giá / ngày</Form.Label>
                <Form.Control
                  type="number"
                  step="0.01"
                  name="roomPricePerDay"
                  value={form.roomPricePerDay}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>
          <Form.Group className="mb-3">
            <Form.Label>Mô tả</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="roomDetailDescription"
              value={form.roomDetailDescription}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Check
            type="checkbox"
            label="Hoạt động"
            name="roomStatus"
            checked={form.roomStatus === 1}
            onChange={handleChange}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Hủy
          </Button>
          <Button variant="primary" type="submit">
            Lưu
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default RoomModal;
