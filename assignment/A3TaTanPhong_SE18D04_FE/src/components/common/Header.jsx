import React, { useContext } from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

const Header = () => {
  const { user, logoutContext } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutContext();
    navigate("/login");
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="mb-4 shadow">
      <Container>
        {/* Logo / Tên hệ thống */}
        <Navbar.Brand
          as={Link}
          to={user?.role === "ROLE_STAFF" ? "/staff/rooms" : "/"}
        >
          FUMiniHotel
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {/* Menu Công khai */}
            <Nav.Link as={Link} to="/rooms">
              Danh sách phòng
            </Nav.Link>

            {/* Menu cho STAFF */}
            {user?.role === "ROLE_STAFF" && (
              <>
                <Nav.Link as={Link} to="/staff/rooms">
                  Quản lý Phòng
                </Nav.Link>
                <Nav.Link as={Link} to="/staff/customers">
                  Quản lý Khách hàng
                </Nav.Link>
                <Nav.Link as={Link} to="/staff/bookings">
                  Quản lý Đặt phòng
                </Nav.Link>
              </>
            )}

            {/* Menu cho CUSTOMER */}
            {user?.role === "ROLE_CUSTOMER" && (
              <>
                <Nav.Link as={Link} to="/customer/book">
                  Đặt phòng
                </Nav.Link>
                <Nav.Link as={Link} to="/customer/profile">
                  Hồ sơ của tôi
                </Nav.Link>
                <Nav.Link as={Link} to="/customer/history">
                  Lịch sử đặt phòng
                </Nav.Link>
              </>
            )}
          </Nav>

          {/* Khu vực Đăng nhập / Đăng xuất */}
          <Nav>
            {user ? (
              <div className="d-flex align-items-center">
                <span className="text-light me-3">Xin chào, {user.email}</span>
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
