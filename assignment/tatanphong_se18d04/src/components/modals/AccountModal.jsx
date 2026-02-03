import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const AccountModal = ({ show, handleClose, handleSave, accountData }) => {
  // 1. Khởi tạo State cho Form theo đúng các trường trong SystemAccount [cite: 27]
  const [formData, setFormData] = useState({
    accountName: "",
    accountEmail: "",
    accountRole: 2, // Mặc định là Staff (2)
    accountPassword: "",
  });

  const [validated, setValidated] = useState(false);

  // 2. Cập nhật dữ liệu Form khi Modal mở (Trường hợp Update hoặc Create mới)
  useEffect(() => {
    if (accountData) {
      setFormData(accountData); // Đổ dữ liệu cũ vào để Update
    } else {
      setFormData({
        accountName: "",
        accountEmail: "",
        accountRole: 2,
        accountPassword: "",
      }); // Reset để Create
    }
    setValidated(false); // Reset trạng thái validation mỗi khi mở modal
  }, [accountData, show]);

  // 3. Xử lý thay đổi dữ liệu trên các trường Input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "accountRole" ? parseInt(value) : value, // Ép kiểu Int cho Role
    });
  };

  // 4. Xử lý lưu dữ liệu kèm theo Validation [cite: 24]
  const handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();

    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
      return;
    }

    handleSave(formData); // Gọi hàm lưu từ component cha (AccountManage)
  };

  return (
    <Modal show={show} onHide={handleClose} centered backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>
          {accountData ? "Update System Account" : "Create New Account"}
        </Modal.Title>
      </Modal.Header>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Modal.Body>
          {/* Name Field */}
          <Form.Group className="mb-3">
            <Form.Label>Account Name</Form.Label>
            <Form.Control
              required
              type="text"
              name="accountName"
              value={formData.accountName}
              onChange={handleChange}
              placeholder="Enter full name"
            />
            <Form.Control.Feedback type="invalid">
              Please provide a name.
            </Form.Control.Feedback>
          </Form.Group>

          {/* Email Field [cite: 35] */}
          <Form.Group className="mb-3">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              required
              type="email"
              name="accountEmail"
              value={formData.accountEmail}
              onChange={handleChange}
              placeholder="name@example.com"
            />
            <Form.Control.Feedback type="invalid">
              Please enter a valid email.
            </Form.Control.Feedback>
          </Form.Group>

          {/* Role Selection  */}
          <Form.Group className="mb-3">
            <Form.Label>Role</Form.Label>
            <Form.Select
              name="accountRole"
              value={formData.accountRole}
              onChange={handleChange}
            >
              <option value={1}>Admin (Role 1)</option>
              <option value={2}>Staff (Role 2)</option>
            </Form.Select>
          </Form.Group>

          {/* Password Field [cite: 35] */}
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              required
              type="password"
              name="accountPassword"
              value={formData.accountPassword}
              onChange={handleChange}
              placeholder="Enter password"
            />
            <Form.Control.Feedback type="invalid">
              Password is required.
            </Form.Control.Feedback>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" type="submit">
            {accountData ? "Update" : "Create"}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default AccountModal;
