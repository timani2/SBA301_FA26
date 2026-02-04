import React, { useState, useEffect } from "react";
import {
  Container,
  Table,
  Button,
  Form,
  InputGroup,
  Row,
  Col,
  Stack,
} from "react-bootstrap";
import { accountService } from "../../services/accountService";
import AccountModal from "../../components/modals/AccountModal";
import ConfirmModal from "../../components/modals/ConfirmModal"; // Import Modal mới
import { toast } from "react-toastify";

const AccountManage = () => {
  const [accounts, setAccounts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState(null);

  // States cho ConfirmModal
  const [showConfirm, setShowConfirm] = useState(false);
  const [targetId, setTargetId] = useState(null);

  useEffect(() => {
    loadAccounts();
  }, []);

  const loadAccounts = async () => {
    try {
      const res = await accountService.getAll();
      setAccounts(res.data);
    } catch (err) {
      toast.error("Không thể tải danh sách tài khoản");
    }
  };

  const handleSearch = async () => {
    const res = await accountService.search(searchTerm);
    setAccounts(res.data);
  };

  const confirmDelete = (id) => {
    setTargetId(id);
    setShowConfirm(true);
  };

  const handleDelete = async () => {
    try {
      const response = await accountService.delete(targetId);
      toast.success(response.data);
      loadAccounts();
    } catch (error) {
      toast.error(error.response?.data || "Lỗi khi xóa tài khoản");
    } finally {
      setShowConfirm(false);
    }
  };

  const handleSave = async (formData) => {
    try {
      if (selectedAccount) {
        await accountService.update(formData.accountID, formData);
        toast.success("Cập nhật thành công!");
      } else {
        await accountService.create(formData);
        toast.success("Tạo mới thành công!");
      }
      setShowModal(false);
      loadAccounts();
    } catch (error) {
      toast.error("Lỗi khi lưu dữ liệu!");
    }
  };

  return (
    <Container className="mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Account Management</h2>
        <Button
          variant="success"
          onClick={() => {
            setSelectedAccount(null);
            setShowModal(true);
          }}
        >
          + Add New Account
        </Button>
      </div>

      <Row className="mb-3">
        <Col md={6}>
          <InputGroup>
            <Form.Control
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
            <Button variant="primary" onClick={handleSearch}>
              Search
            </Button>
          </InputGroup>
        </Col>
      </Row>

      <Table striped bordered hover responsive style={{ tableLayout: "fixed" }}>
        <thead className="table-dark">
          <tr>
            <th style={{ width: "70px" }}>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th style={{ width: "120px" }}>Role</th>
            <th style={{ width: "180px" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {accounts.map((acc) => (
            <tr key={acc.accountID} style={{ verticalAlign: "middle" }}>
              <td>{acc.accountID}</td>
              <td>{acc.accountName}</td>
              <td>{acc.accountEmail}</td>
              <td>{acc.accountRole === 1 ? "Admin" : "Staff"}</td>
              <td>
                <Stack direction="horizontal" gap={2}>
                  <Button
                    variant="warning"
                    size="sm"
                    style={{ width: "70px" }}
                    onClick={() => {
                      setSelectedAccount(acc);
                      setShowModal(true);
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    style={{ width: "70px" }}
                    onClick={() => confirmDelete(acc.accountID)}
                  >
                    Delete
                  </Button>
                </Stack>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <AccountModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        handleSave={handleSave}
        accountData={selectedAccount}
      />

      {/* Confirm Modal thay thế alert confirm */}
      <ConfirmModal
        show={showConfirm}
        handleClose={() => setShowConfirm(false)}
        title="Xác nhận xóa"
        body="Bạn có chắc chắn muốn xóa tài khoản này không? Thao tác này không thể hoàn tác."
        onConfirm={handleDelete}
      />
    </Container>
  );
};
export default AccountManage;
