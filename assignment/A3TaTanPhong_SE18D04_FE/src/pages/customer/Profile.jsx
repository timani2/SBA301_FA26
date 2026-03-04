import { useState, useEffect } from "react";
import { Form, Button, Card, Container, Row, Col } from "react-bootstrap";
import { customerService } from "../../services/customerService";
import { toast } from "react-toastify";

const Profile = () => {
  const [formData, setFormData] = useState({
    customerName: "",
    customerBirthday: "",
    customerAddress: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Trong thực tế, bạn có thể gọi một API getProfile riêng.
    // Nếu chưa có, FE có thể lấy email từ localStorage và gọi API STAFF để lấy thông tin (nếu được phép)
    // Hoặc đơn giản là khởi tạo form trống để khách hàng cập nhật.
    setLoading(false);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Backend: PUT /customer/profile
      const response = await customerService.updateMyProfile(formData);
      toast.success(response.message || "Cập nhật hồ sơ thành công!");
    } catch (error) {
      console.error("Update profile error:", error);
    }
  };

  if (loading) return <div>Đang tải...</div>;

  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={6}>
          <Card className="shadow">
            <Card.Body>
              <h3 className="text-center mb-4">Thông tin cá nhân</h3>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Họ và tên</Form.Label>
                  <Form.Control
                    name="customerName"
                    value={formData.customerName}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Ngày sinh</Form.Label>
                  <Form.Control
                    type="date"
                    name="customerBirthday"
                    value={formData.customerBirthday}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-4">
                  <Form.Label>Địa chỉ</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="customerAddress"
                    value={formData.customerAddress}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Button variant="primary" type="submit" className="w-100">
                  Lưu thay đổi
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;
