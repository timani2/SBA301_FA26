import React, { useEffect, useState } from "react";
import { Container, Table, Badge, Button } from "react-bootstrap";
import { useCustomers } from "../../hooks/useCustomers";
import { formatDate } from "../../utils/formatDate";
import LoadingSpinner from "../../components/ui/LoadingSpinner";
import CustomerModal from "../../components/modals/CustomerModal";

const ManageCustomers = () => {
  const { customers, loading, fetchAllCustomers, updateProfile } =
    useCustomers();

  // Tự động lấy danh sách khi trang vừa load
  useEffect(() => {
    fetchAllCustomers();
  }, [fetchAllCustomers]);

  // state cho modal sửa/khóa
  const [showForm, setShowForm] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState(null);

  if (loading && customers.length === 0)
    return <LoadingSpinner text="Đang tải danh sách khách hàng..." />;

  return (
    <Container className="py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="fw-bold">Quản Lý Khách Hàng</h3>
      </div>

      <Table
        striped
        bordered
        hover
        responsive
        className="align-middle shadow-sm"
      >
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Họ và Tên</th>
            <th>Email</th>
            <th>Số Điện Thoại</th>
            <th>Ngày Sinh</th>
            <th>Trạng Thái</th>
            <th className="text-center">Hành Động</th>
          </tr>
        </thead>
        <tbody>
          {customers.length > 0 ? (
            customers.map((customer) => (
              <tr key={customer.customerId}>
                <td>{customer.customerId}</td>
                <td className="fw-bold">{customer.customerFullName}</td>
                <td>{customer.emailAddress}</td>
                <td>{customer.telephone || "Chưa cập nhật"}</td>
                <td>
                  {formatDate(customer.customerBirthday) || "Chưa cập nhật"}
                </td>
                <td>
                  <Badge
                    bg={customer.customerStatus === 1 ? "success" : "danger"}
                  >
                    {customer.customerStatus === 1 ? "Hoạt động" : "Bị khóa"}
                  </Badge>
                </td>
                <td className="text-center">
                  <Button
                    variant="outline-primary"
                    size="sm"
                    className="me-2"
                    onClick={() => {
                      setEditingCustomer(customer);
                      setShowForm(true);
                    }}
                  >
                    Sửa
                  </Button>
                  {/* Nút Khóa/Mở khóa */}
                  <Button
                    variant={
                      customer.customerStatus === 1
                        ? "outline-danger"
                        : "outline-success"
                    }
                    size="sm"
                    onClick={async () => {
                      // toggle status
                      const newStatus = customer.customerStatus === 1 ? 0 : 1;
                      const ok = await updateProfile(customer.customerId, {
                        customerStatus: newStatus,
                      });
                      if (ok) {
                        // update local state
                        fetchAllCustomers();
                      }
                    }}
                  >
                    {customer.customerStatus === 1 ? "Khóa" : "Mở khóa"}
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center py-4 text-muted">
                Chưa có dữ liệu khách hàng.
              </td>
            </tr>
          )}
        </tbody>
      </Table>

      {/* modal sửa khách hàng */}
      <CustomerModal
        show={showForm}
        handleClose={() => setShowForm(false)}
        initialData={editingCustomer}
        onSave={async (data) => {
          const ok = await updateProfile(data.customerId, data);
          if (ok) {
            fetchAllCustomers();
          }
          return ok;
        }}
      />
    </Container>
  );
};

export default ManageCustomers;
