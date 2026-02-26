import React, { useState } from "react";
import { Container, Form, Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import LoadingSpinner from "../../components/ui/LoadingSpinner";

const Register = () => {
  const [formData, setFormData] = useState({
    customerFullName: "",
    emailAddress: "",
    password: "",
    telephone: "",
  });

  const { register, loading } = useAuth();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    register(formData); // Gọi hook để đăng ký
  };

  if (loading) return <LoadingSpinner text="Đang xử lý đăng ký..." />;

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <Card
        style={{ width: "450px" }}
        className="shadow-lg border-0 rounded-lg mt-5"
      >
        <Card.Header className="bg-success text-white text-center py-4">
          <h4 className="mb-0 text-white">Đăng Ký Tài Khoản</h4>
        </Card.Header>
        <Card.Body className="p-4">
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Họ và Tên</Form.Label>
              <Form.Control
                type="text"
                name="customerFullName"
                placeholder="Nhập họ tên"
                required
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="emailAddress"
                placeholder="name@example.com"
                required
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Số điện thoại</Form.Label>
              <Form.Control
                type="text"
                name="telephone"
                placeholder="Nhập số điện thoại"
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>Mật khẩu</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Nhập mật khẩu"
                required
                onChange={handleChange}
              />
            </Form.Group>

            <Button variant="success" type="submit" className="w-100 py-2 mb-3">
              Đăng Ký
            </Button>
            <div className="text-center">
              <span className="text-muted">Đã có tài khoản? </span>
              <Link to="/login" className="text-success">
                Đăng nhập
              </Link>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Register;
