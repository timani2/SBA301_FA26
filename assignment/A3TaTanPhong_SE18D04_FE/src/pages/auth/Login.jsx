import { useState } from "react";
import { Form, Button, Card, Container, Row, Col } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Gọi hàm login từ context (đã bao gồm gọi authService.login)
      const authData = await login(email, password);

      // Điều hướng dựa trên role từ AuthResponse
      if (authData.role === "STAFF") {
        navigate("/staff/rooms");
      } else {
        navigate("/");
      }
    } catch (error) {
      // Lỗi chi tiết đã được xử lý tại api interceptor
      console.error("Login failed", error);
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col md={5}>
          <Card className="shadow">
            <Card.Body className="p-4">
              <h2 className="text-center mb-4">Đăng nhập</h2>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Nhập email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label>Mật khẩu</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Nhập mật khẩu"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100 mb-3">
                  Đăng nhập
                </Button>

                <div className="text-center">
                  <span>Chưa có tài khoản? </span>
                  <Link to="/register">Đăng ký ngay</Link>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
