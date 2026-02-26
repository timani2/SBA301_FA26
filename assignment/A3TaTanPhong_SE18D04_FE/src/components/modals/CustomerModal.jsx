import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";

const CustomerModal = ({ show, handleClose, initialData, onSave }) => {
  const [form, setForm] = useState({
    customerId: null,
    customerFullName: "",
    emailAddress: "",
    telephone: "",
    customerBirthday: "",
    customerStatus: 1,
  });

  useEffect(() => {
    if (initialData) {
      setForm({
        customerId: initialData.customerId,
        customerFullName: initialData.customerFullName || "",
        emailAddress: initialData.emailAddress || "",
        telephone: initialData.telephone || "",
        customerBirthday: initialData.customerBirthday
          ? initialData.customerBirthday.substring(0, 10)
          : "",
        customerStatus:
          initialData.customerStatus != null ? initialData.customerStatus : 1,
      });
    } else {
      setForm({
        customerId: null,
        customerFullName: "",
        emailAddress: "",
        telephone: "",
        customerBirthday: "",
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
              disabled={!!form.customerId} // không cho sửa email khi edit
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
              <Form.Group>
                <Form.Label>Ngày sinh</Form.Label>
                <Form.Control
                  type="date"
                  name="customerBirthday"
                  value={form.customerBirthday}
                  onChange={handleChange}
                  max={new Date().toISOString().split("T")[0]}
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
