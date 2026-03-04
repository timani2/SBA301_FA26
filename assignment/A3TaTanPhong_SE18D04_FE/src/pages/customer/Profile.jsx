import { useState, useEffect } from "react";
import { Form, Button, Card, Container, Row, Col, Alert } from "react-bootstrap";
import { customerService } from "../../services/customerService";
import { useAuth } from "../../hooks/useAuth";
import { toast } from "react-toastify";

const Profile = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setError(null);
        const res = await customerService.getMyProfile();
        const data = res?.data ?? res;
        if (data) {
          setFormData({
            fullName: data.fullName ?? "",
            email: data.email ?? "",
            phone: data.phone ?? "",
            address: data.address ?? "",
          });
        } else {
          setFormData((prev) => ({ ...prev, email: user?.email ?? "" }));
        }
      } catch (err) {
        console.error("Fetch profile error:", err);
        setError("Không tải được thông tin. Vui lòng kiểm tra đăng nhập và thử lại.");
        setFormData((prev) => ({ ...prev, email: user?.email ?? "" }));
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [user?.email]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name !== "email") setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        fullName: formData.fullName,
        phone: formData.phone,
        address: formData.address,
      };
      const response = await customerService.updateMyProfile(payload);
      toast.success(response?.message || "Cập nhật hồ sơ thành công!");
    } catch (error) {
      console.error("Update profile error:", error);
    }
  };

  if (loading) return <div className="text-center mt-5">Đang tải...</div>;

  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={6}>
          {error && (
            <Alert variant="warning" dismissible onClose={() => setError(null)}>
              {error}
            </Alert>
          )}
          <Card className="shadow">
            <Card.Body>
              <h3 className="text-center mb-4">Quản lý hồ sơ cá nhân</h3>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Họ và tên</Form.Label>
                  <Form.Control
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    disabled
                    className="bg-secondary bg-opacity-10"
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Số điện thoại</Form.Label>
                  <Form.Control
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group className="mb-4">
                  <Form.Label>Địa chỉ</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="address"
                    value={formData.address}
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
