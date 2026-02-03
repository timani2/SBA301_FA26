import React, { useState } from "react";
import { Form, Button, Container, Card, Alert, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { authService } from "../../services/authService";

const Login = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Gọi API Login từ Backend
      const response = await authService.login(credentials);
      const user = response.data;

      // Lưu thông tin người dùng vào localStorage (bao gồm accountRole)
      authService.setCurrentUser(user);

      // Phân quyền điều hướng dựa trên Role
      if (user.accountRole === 1) {
        navigate("/admin/accounts"); // Admin vào trang quản lý tài khoản
      } else if (user.accountRole === 2) {
        navigate("/staff/news"); // Staff vào trang quản lý tin tức
      } else {
        setError("Tài khoản của bạn không có quyền truy cập hệ thống.");
      }
    } catch (err) {
      setError(
        err.response?.data || "Sai email hoặc mật khẩu. Vui lòng thử lại!",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "80vh" }}
    >
      <Card
        style={{ width: "100%", maxWidth: "400px" }}
        className="shadow-sm border-0"
      >
        <Card.Body className="p-4">
          <div className="text-center mb-4">
            <h2 className="fw-bold text-primary">FUNews Login</h2>
            <p className="text-muted">Đăng nhập để quản lý hệ thống tin tức</p>
          </div>
          <Alert variant="info" className="small">
            <strong>Sample Accounts:</strong> <br />- Admin:{" "}
            <code>admin@funews.com.vn</code> | <code>admin123</code> <br />-
            Staff: <code>staff01@funews.com.vn</code> | <code>staff123</code>
          </Alert>

          {error && <Alert variant="danger">{error}</Alert>}

          <Form onSubmit={handleLogin}>
            <Form.Group className="mb-3">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Enter your email"
                value={credentials.email}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Enter password"
                value={credentials.password}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Button
              variant="primary"
              type="submit"
              className="w-100 py-2 mt-2"
              disabled={loading}
            >
              {loading ? <Spinner animation="border" size="sm" /> : "Login"}
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Login;
