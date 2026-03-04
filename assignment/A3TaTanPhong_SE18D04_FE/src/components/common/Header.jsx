import { Link, useNavigate } from "react-router-dom";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { useAuth } from "../../hooks/useAuth";

const Header = () => {
  const { user, logout, isStaff, isCustomer } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
      <Container>
        <Navbar.Brand as={Link} to="/">
          Hotel Manager
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">
              Trang chủ
            </Nav.Link>

            {/* Menu dành riêng cho STAFF */}
            {isStaff && (
              <>
                <Nav.Link as={Link} to="/staff/rooms">
                  Quản lý phòng
                </Nav.Link>
                <Nav.Link as={Link} to="/staff/customers">
                  Khách hàng
                </Nav.Link>
                <Nav.Link as={Link} to="/staff/bookings">
                  Đơn đặt phòng
                </Nav.Link>
              </>
            )}

            {/* Menu dành riêng cho CUSTOMER */}
            {isCustomer && (
              <>
                <Nav.Link as={Link} to="/customer/bookings">
                  Lịch sử đặt
                </Nav.Link>
                <Nav.Link as={Link} to="/customer/profile">
                  Thông tin cá nhân
                </Nav.Link>
              </>
            )}
          </Nav>

          <Nav>
            {user ? (
              <div className="d-flex align-items-center">
                <span className="text-light me-3">Chào, {user.email}</span>
                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={handleLogout}
                >
                  Đăng xuất
                </Button>
              </div>
            ) : (
              <>
                <Nav.Link as={Link} to="/login">
                  Đăng nhập
                </Nav.Link>
                <Nav.Link as={Link} to="/register">
                  Đăng ký
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
