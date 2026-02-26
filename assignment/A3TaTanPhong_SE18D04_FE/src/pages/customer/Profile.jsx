import React, { useState, useEffect, useContext } from "react";
import { Container, Card, Form, Button, Row, Col } from "react-bootstrap";
import { AuthContext } from "../../contexts/AuthContext";
import { useCustomers } from "../../hooks/useCustomers";
import LoadingSpinner from "../../components/ui/LoadingSpinner";

const Profile = () => {
  const { user } = useContext(AuthContext);
  const { customers, loading, fetchAllCustomers, updateProfile } =
    useCustomers();

  // State lưu trữ dữ liệu form
  const [formData, setFormData] = useState({
    customerId: "",
    customerFullName: "",
    telephone: "",
    customerBirthday: "",
    emailAddress: "",
    password: "", // Cần gửi lại password cũ (hoặc backend không update field này nếu null)
  });

  // 1. Tải danh sách khách hàng để tìm ra thông tin của chính mình
  useEffect(() => {
    fetchAllCustomers();
  }, [fetchAllCustomers]);

  // 2. Map dữ liệu vào form sau khi tìm thấy mình dựa trên Email
  useEffect(() => {
    if (customers.length > 0 && user) {
      const myInfo = customers.find((c) => c.emailAddress === user.email);
      if (myInfo) {
        setFormData({
          customerId: myInfo.customerId,
          customerFullName: myInfo.customerFullName,
          telephone: myInfo.telephone || "",
          // Backend trả về 'YYYY-MM-DD', ta cắt lấy 10 kí tự đầu để map vào type="date"
          customerBirthday: myInfo.customerBirthday
            ? myInfo.customerBirthday.substring(0, 10)
            : "",
          emailAddress: myInfo.emailAddress,
          password: myInfo.password,
        });
      }
    }
  }, [customers, user]);

  // Xử lý khi người dùng gõ vào form
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Xử lý submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateProfile(formData.customerId, formData);
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
              <Form.Label>Địa chỉ Email (Không được đổi)</Form.Label>
              <Form.Control
                type="email"
                value={formData.emailAddress}
                disabled
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Họ và Tên</Form.Label>
              <Form.Control
                type="text"
                name="customerFullName"
                value={formData.customerFullName}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Row className="mb-4">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Số Điện Thoại</Form.Label>
                  <Form.Control
                    type="text"
                    name="telephone"
                    value={formData.telephone}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Ngày Sinh</Form.Label>
                  <Form.Control
                    type="date"
                    name="customerBirthday"
                    value={formData.customerBirthday}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Button
              variant="primary"
              type="submit"
              className="w-100 py-2"
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
