import { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const CustomerModal = ({ show, onHide, onSubmit, initialData }) => {
  const [formData, setFormData] = useState({
    customerName: "",
    customerBirthday: "",
    customerAddress: "",
  });

  useEffect(() => {
    if (initialData) {
      // Backend có thể trả về date dạng mảng hoặc string, cần xử lý để hiển thị trong input date
      let birthday = initialData.customerBirthday;
      if (Array.isArray(birthday)) {
        const [y, m, d] = birthday;
        birthday = `${y}-${m.toString().padStart(2, "0")}-${d.toString().padStart(2, "0")}`;
      }

      setFormData({
        customerName: initialData.customerName || "",
        customerBirthday: birthday || "",
        customerAddress: initialData.customerAddress || "",
      });
    }
  }, [initialData, show]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>Cập nhật thông tin khách hàng</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Họ và tên</Form.Label>
            <Form.Control
              name="customerName"
              value={formData.customerName}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Ngày sinh</Form.Label>
            <Form.Control
              type="date"
              name="customerBirthday"
              value={formData.customerBirthday}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Địa chỉ</Form.Label>
            <Form.Control
              as="textarea"
              rows={2}
              name="customerAddress"
              value={formData.customerAddress}
              onChange={handleChange}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Hủy
          </Button>
          <Button variant="primary" type="submit">
            Cập nhật
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default CustomerModal;
