import React, { useState, useEffect, useContext } from "react";
import { Container, Card, Form, Button, Row, Col } from "react-bootstrap";
import { AuthContext } from "../../contexts/AuthContext";
import { useCustomers } from "../../hooks/useCustomers";
import LoadingSpinner from "../../components/ui/LoadingSpinner";
// Import thư viện datepicker và utils đã thống nhất
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  parseDateFromBackend,
  formatDateForBackend,
} from "../../utils/formatDate";

const Profile = () => {
  const { user } = useContext(AuthContext);
  const { customers, loading, fetchAllCustomers, updateProfile } =
    useCustomers();

  // State lưu trữ dữ liệu form
  const [formData, setFormData] = useState({
    customerId: "",
    customerFullName: "",
    telephone: "",
    customerBirthday: null, // Sử dụng đối tượng Date cho DatePicker
    emailAddress: "",
    password: "",
    customerStatus: 1, // Bổ sung trường trạng thái khách hàng
  });

  // 1. Tải danh sách khách hàng để tìm ra thông tin cá nhân
  useEffect(() => {
    fetchAllCustomers();
  }, [fetchAllCustomers]);

  // 2. Đồng bộ dữ liệu từ danh sách vào form dựa trên email đăng nhập
  useEffect(() => {
    if (customers.length > 0 && user) {
      const myInfo = customers.find((c) => c.emailAddress === user.email);
      if (myInfo) {
        setFormData({
          customerId: myInfo.customerId,
          customerFullName: myInfo.customerFullName,
          telephone: myInfo.telephone || "",
          // Sử dụng hàm parse dùng chung để xử lý mọi định dạng từ Backend
          customerBirthday: parseDateFromBackend(myInfo.customerBirthday),
          emailAddress: myInfo.emailAddress,
          password: myInfo.password,
          customerStatus: myInfo.customerStatus,
        });
      }
    }
  }, [customers, user]);

  // Xử lý khi người dùng nhập văn bản
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Xử lý gửi form cập nhật
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Chuẩn hóa ngày sinh về định dạng yyyy-MM-dd trước khi gửi lên API
    const payload = {
      ...formData,
      customerBirthday: formatDateForBackend(formData.customerBirthday),
    };

    await updateProfile(formData.customerId, payload);
  };

  if (loading && !formData.customerId)
    return <LoadingSpinner text="Đang tải dữ liệu hồ sơ..." />;

  return (
    <Container className="py-5 d-flex justify-content-center">
      <Card className="shadow-sm w-100" style={{ maxWidth: "600px" }}>
        <Card.Header className="bg-primary text-white text-center py-3">
          <h4 className="mb-0 fw-bold">Hồ Sơ Của Tôi</h4>
        </Card.Header>
        <Card.Body className="p-4">
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label className="fw-bold">
                Địa chỉ Email (Không được đổi)
              </Form.Label>
              <Form.Control
                type="email"
                value={formData.emailAddress}
                disabled
                className="bg-light"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="fw-bold">Họ và Tên</Form.Label>
              <Form.Control
                type="text"
                name="customerFullName"
                value={formData.customerFullName}
                onChange={handleChange}
                required
                placeholder="Nhập họ và tên"
              />
            </Form.Group>

            <Row className="mb-4">
              <Col md={6}>
                <Form.Group>
                  <Form.Label className="fw-bold">Số Điện Thoại</Form.Label>
                  <Form.Control
                    type="text"
                    name="telephone"
                    value={formData.telephone}
                    onChange={handleChange}
                    placeholder="Nhập số điện thoại"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="d-flex flex-column">
                  <Form.Label className="fw-bold">Ngày Sinh</Form.Label>
                  <DatePicker
                    selected={formData.customerBirthday}
                    onChange={(date) =>
                      setFormData({ ...formData, customerBirthday: date })
                    }
                    maxDate={new Date()} // Không cho phép chọn ngày trong tương lai
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

            <Button
              variant="primary"
              type="submit"
              className="w-100 py-2 fw-bold"
              disabled={loading}
            >
              {loading ? "Đang cập nhật..." : "Cập Nhật Hồ Sơ"}
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Profile;
