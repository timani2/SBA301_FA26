import { useState } from "react";
import { Form, Button, Card, Container, Row, Col } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import { authService } from "../../services/authService";
import { toast } from "react-toastify";

const Register = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    customerName: "",
    customerBirthday: "",
    customerAddress: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Gửi yêu cầu đăng ký tới Backend
      const response = await authService.register(formData);
      toast.success(response.message || "Đăng ký tài khoản thành công!");
      navigate("/login");
    } catch (error) {
      console.error("Registration error:", error);
    }
  };

  return (
    <Container className="mt-4">
      <Row className="justify-content-md-center">
        <Col md={6}>
          <Card className="shadow">
            <Card.Body className="p-4">
              <h2 className="text-center mb-4">Đăng ký thành viên</h2>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Họ và tên</Form.Label>
                  <Form.Control
                    name="customerName"
                    placeholder="Nguyễn Văn A"
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        placeholder="example@gmail.com"
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Ngày sinh</Form.Label>
                      <Form.Control
                        type="date"
                        name="customerBirthday"
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-3">
                  <Form.Label>Mật khẩu</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    placeholder="Tối thiểu 6 ký tự"
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label>Địa chỉ</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={2}
                    name="customerAddress"
                    placeholder="Nhập địa chỉ liên lạc"
                    onChange={handleChange}
                  />
                </Form.Group>

                <Button variant="success" type="submit" className="w-100 mb-3">
                  Tạo tài khoản
                </Button>

                <div className="text-center">
                  <span>Đã có tài khoản? </span>
                  <Link to="/login">Đăng nhập</Link>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
