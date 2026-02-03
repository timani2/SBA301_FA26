import React, { useState, useEffect } from "react";
import {
  Container,
  Table,
  Button,
  Form,
  InputGroup,
  Row,
  Col,
  Alert,
} from "react-bootstrap";
import { accountService } from "../../services/accountService";
import AccountModal from "../../components/modals/AccountModal";

const AccountManage = () => {
  const [accounts, setAccounts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [message, setMessage] = useState({ type: "", content: "" });

  // 1. Load danh sách tài khoản khi vào trang
  useEffect(() => {
    loadAccounts();
  }, []);

  const loadAccounts = async () => {
    try {
      const response = await accountService.getAll();
      setAccounts(response.data);
    } catch (error) {
      console.error("Lỗi khi tải danh sách:", error);
    }
  };

  // 2. Xử lý Tìm kiếm (Search)
  const handleSearch = async () => {
    try {
      const response = await accountService.search(searchTerm);
      setAccounts(response.data);
    } catch (error) {
      console.error("Lỗi tìm kiếm:", error);
    }
  };

  // 3. Xử lý Xóa (Delete) với xác nhận
  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa tài khoản này không?")) {
      try {
        const response = await accountService.delete(id);
        setMessage({ type: "success", content: response.data });
        loadAccounts(); // Load lại danh sách sau khi xóa
      } catch (error) {
        // Hiển thị lỗi từ Backend (ví dụ: Tài khoản đã có bài viết nên không được xóa)
        setMessage({
          type: "danger",
          content: error.response?.data || "Lỗi khi xóa tài khoản",
        });
      }
    }
  };

  // 4. Xử lý lưu dữ liệu từ Modal (Create hoặc Update)
  const handleSave = async (formData) => {
    try {
      if (selectedAccount) {
        // Nếu có selectedAccount -> Gọi API Update
        await accountService.update(formData.accountID, formData);
        setMessage({
          type: "success",
          content: "Cập nhật tài khoản thành công!",
        });
      } else {
        // Nếu không -> Gọi API Create
        await accountService.create(formData);
        setMessage({
          type: "success",
          content: "Tạo tài khoản mới thành công!",
        });
      }
      setShowModal(false);
      loadAccounts();
    } catch (error) {
      setMessage({ type: "danger", content: "Lỗi khi lưu dữ liệu!" });
    }
  };

  const openCreateModal = () => {
    setSelectedAccount(null);
    setShowModal(true);
  };

  const openUpdateModal = (account) => {
    setSelectedAccount(account);
    setShowModal(true);
  };

  return (
    <Container>
      <div className="d-flex justify-content-between align-items-center my-4">
        <h2>Account Management</h2>
        <Button variant="success" onClick={openCreateModal}>
          + Add New Account
        </Button>
      </div>

      {/* Thông báo lỗi hoặc thành công */}
      {message.content && (
        <Alert
          variant={message.type}
          onClose={() => setMessage({ type: "", content: "" })}
          dismissible
        >
          {message.content}
        </Alert>
      )}

      {/* Thanh Tìm kiếm */}
      <Row className="mb-3">
        <Col md={6}>
          <InputGroup>
            <Form.Control
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button variant="primary" onClick={handleSearch}>
              Search
            </Button>
          </InputGroup>
        </Col>
      </Row>

      {/* Bảng danh sách tài khoản */}
      <Table striped bordered hover responsive shadow-sm>
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {accounts.map((acc) => (
            <tr key={acc.accountID}>
              <td>{acc.accountID}</td>
              <td>{acc.accountName}</td>
              <td>{acc.accountEmail}</td>
              <td>{acc.accountRole === 1 ? "Admin" : "Staff"}</td>
              <td>
                <Button
                  variant="warning"
                  size="sm"
                  className="me-2"
                  onClick={() => openUpdateModal(acc)}
                >
                  Edit
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDelete(acc.accountID)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Gọi Modal để Thêm/Sửa */}
      <AccountModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        handleSave={handleSave}
        accountData={selectedAccount}
      />
    </Container>
  );
};

export default AccountManage;
