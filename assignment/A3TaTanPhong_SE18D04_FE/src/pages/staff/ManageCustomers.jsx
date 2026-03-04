import { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import { useCustomers } from "../../hooks/useCustomers";
import { customerService } from "../../services/customerService";
import CustomerModal from "../../components/modals/CustomerModal";
import { toast } from "react-toastify";

const ManageCustomers = () => {
  const { customers, loading, fetchAllCustomers, deleteCustomer } =
    useCustomers();
  const [showModal, setShowModal] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  useEffect(() => {
    fetchAllCustomers();
  }, [fetchAllCustomers]);

  const handleEdit = (customer) => {
    setSelectedCustomer(customer);
    setShowModal(true);
  };

  const handleUpdateSubmit = async (formData) => {
    try {
      // Backend: PUT /staff/customers/{id}
      const response = await customerService.updateCustomer(
        selectedCustomer.customerId,
        formData,
      );

      // Axios thường trả về dữ liệu trong response.data
      // Kiểm tra cấu trúc ApiResponse của bạn (thường có field message)
      toast.success(response?.message || "Cập nhật thành công");
      setShowModal(false);
      fetchAllCustomers();
    } catch (error) {
      console.error(error);
      toast.error("Có lỗi xảy ra khi cập nhật!");
    }
  };

  if (loading)
    return (
      <div className="text-center mt-5">Đang tải danh sách khách hàng...</div>
    );

  return (
    <div>
      <h2 className="mb-4">Quản lý khách hàng</h2>
      <Table striped bordered hover responsive>
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Họ và tên</th>
            <th>Email</th>
            <th>Số điện thoại</th>
            <th>Địa chỉ</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {customers && customers.length > 0 ? (
            customers.map((c) => (
              <tr key={c.customerId}>
                <td>{c.customerId}</td>
                {/* fullName từ CustomerResponse */}
                <td>{c.fullName}</td>
                {/* email từ CustomerResponse */}
                <td>{c.email}</td>
                {/* phone từ CustomerResponse */}
                <td>{c.phone || "N/A"}</td>
                {/* address từ CustomerResponse */}
                <td>{c.address || "N/A"}</td>
                <td>
                  <Button
                    variant="warning"
                    size="sm"
                    className="me-2"
                    onClick={() => handleEdit(c)}
                  >
                    Sửa
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => {
                      if (
                        window.confirm(
                          "Bạn có chắc chắn muốn xóa khách hàng này?",
                        )
                      ) {
                        deleteCustomer(c.customerId);
                      }
                    }}
                  >
                    Xóa
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center">
                Không có dữ liệu khách hàng
              </td>
            </tr>
          )}
        </tbody>
      </Table>

      <CustomerModal
        show={showModal}
        onHide={() => setShowModal(false)}
        onSubmit={handleUpdateSubmit}
        initialData={selectedCustomer}
      />
    </div>
  );
};

export default ManageCustomers;
