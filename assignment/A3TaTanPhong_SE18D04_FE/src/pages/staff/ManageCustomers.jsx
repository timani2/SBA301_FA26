import { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import { useCustomers } from "../../hooks/useCustomers";
import { customerService } from "../../services/customerService";
import { formatDate } from "../../utils/formatDate";
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
      // Cập nhật khách hàng: PUT /staff/customers/{id}
      const response = await customerService.updateCustomer(
        selectedCustomer.id,
        formData,
      );
      toast.success(response.message || "Cập nhật thành công");
      setShowModal(false);
      fetchAllCustomers();
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) return <div>Đang tải danh sách khách hàng...</div>;

  return (
    <div>
      <h2 className="mb-4">Quản lý khách hàng</h2>
      <Table striped bordered hover responsive>
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Họ và tên</th>
            <th>Email</th>
            <th>Ngày sinh</th>
            <th>Địa chỉ</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((c) => (
            <tr key={c.id}>
              <td>{c.id}</td>
              <td>{c.customerName}</td>
              <td>{c.email}</td>
              <td>{formatDate(c.customerBirthday)}</td>
              <td>{c.customerAddress}</td>
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
                  onClick={() => deleteCustomer(c.id)}
                >
                  Xóa
                </Button>
              </td>
            </tr>
          ))}
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
