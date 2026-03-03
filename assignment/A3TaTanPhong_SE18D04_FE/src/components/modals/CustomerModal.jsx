import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// Import các hàm tiện ích đã định nghĩa ở trên
import {
  parseDateFromBackend,
  formatDateForBackend,
} from "../../utils/formatDate";

const CustomerModal = ({ show, handleClose, initialData, onSave }) => {
  const [form, setForm] = useState({
    customerId: null,
    customerFullName: "",
    emailAddress: "",
    telephone: "",
    customerBirthday: null, // Sử dụng đối tượng Date cho DatePicker
    customerStatus: 1,
  });

  useEffect(() => {
    if (initialData) {
      setForm({
        customerId: initialData.customerId,
        customerFullName: initialData.customerFullName || "",
        emailAddress: initialData.emailAddress || "",
        telephone: initialData.telephone || "",
        // Chuẩn hóa dữ liệu từ Backend thành Date object
        customerBirthday: parseDateFromBackend(initialData.customerBirthday),
        customerStatus:
          initialData.customerStatus != null ? initialData.customerStatus : 1,
      });
    } else {
      setForm({
        customerId: null,
        customerFullName: "",
        emailAddress: "",
        telephone: "",
        customerBirthday: null,
        customerStatus: 1,
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

    // Chuyển đổi Date object thành chuỗi yyyy-MM-dd trước khi gửi đi
    const payload = {
      ...form,
      customerBirthday: formatDateForBackend(form.customerBirthday),
    };

    if (onSave) {
      const success = await onSave(payload);
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
            {form.customerId ? "Sửa khách hàng" : "Thêm khách hàng"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Họ và tên</Form.Label>
            <Form.Control
              type="text"
              name="customerFullName"
              required
              value={form.customerFullName}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="emailAddress"
              required
              value={form.emailAddress}
              onChange={handleChange}
              disabled={!!form.customerId}
            />
          </Form.Group>

          <Row className="mb-3">
            <Col>
              <Form.Group>
                <Form.Label>Số điện thoại</Form.Label>
                <Form.Control
                  type="text"
                  name="telephone"
                  value={form.telephone}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="d-flex flex-column">
                <Form.Label>Ngày sinh</Form.Label>
                <DatePicker
                  selected={form.customerBirthday}
                  onChange={(date) =>
                    setForm((prev) => ({
                      ...prev,
                      customerBirthday: date,
                    }))
                  }
                  maxDate={new Date()} // Không cho chọn tương lai
                  dateFormat="yyyy-MM-dd"
                  className="form-control"
                  placeholderText="Chọn ngày sinh"
                  showMonthDropdown
                  showYearDropdown
                  dropdownMode="select"
                />
              </Form.Group>
            </Col>
          </Row>

          <Form.Check
            type="checkbox"
            label="Hoạt động"
            name="customerStatus"
            checked={form.customerStatus === 1}
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

export default CustomerModal;
