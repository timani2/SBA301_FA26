import React, { useState } from "react";
import { Container, Form, Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import LoadingSpinner from "../../components/ui/LoadingSpinner";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Gọi "bộ não" useAuth ra để sử dụng
  const { login, loading } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password); // Ném dữ liệu cho Hook tự xử lý
  };

  if (loading) return <LoadingSpinner text="Đang đăng nhập..." />;

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <Card
        style={{ width: "400px" }}
        className="shadow-lg border-0 rounded-lg mt-5"
      >
        <Card.Header className="bg-primary text-white text-center py-4">
          <h4 className="mb-0 text-white">Đăng Nhập Hệ Thống</h4>
        </Card.Header>
        <Card.Body className="p-4">
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>Mật khẩu</Form.Label>
              <Form.Control
                type="password"
                placeholder="Nhập mật khẩu"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100 py-2 mb-3">
              Đăng Nhập
            </Button>
            <div className="text-center">
              <span className="text-muted">Chưa có tài khoản? </span>
              <Link to="/register">Đăng ký ngay</Link>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Login;
