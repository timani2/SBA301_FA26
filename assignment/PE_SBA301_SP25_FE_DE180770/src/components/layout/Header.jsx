import React, { useState } from "react";
import { Navbar, Nav, NavDropdown, Container, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import authService from "../../services/authService";
import LoginModal from "../auth/LoginModal";

const Header = () => {
  const [showLogin, setShowLogin] = useState(false);
  const navigate = useNavigate();

  // Lấy thông tin từ Service và LocalStorage
  const token = authService.getToken();
  const userRole = authService.getCurrentUserRole(); // '1' là Admin
  const memberID = localStorage.getItem("memberID");

  const handleLogout = () => {
    authService.logout();
    navigate("/");
    window.location.reload(); // Làm mới để cập nhật lại trạng thái Navbar
  };

  return (
    <>
      <Navbar
        bg="dark"
        variant="dark"
        expand="lg"
        sticky="top"
        className="shadow-sm"
      >
        <Container>
          {/* Task 3.1: Navbar.Brand - Giữ đúng định dạng tên sinh viên */}
          <Navbar.Brand as={Link} to="/" className="fw-bold">
            DE180770 - Ta Tan Phong PE Sping 25
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              {/* Home Link - Luôn hiển thị cho mọi người */}
              <Nav.Link as={Link} to="/">
                Home
              </Nav.Link>

              {/* Task 3.1: Nav.Dropdown - Quản lý chức năng xe */}
              <NavDropdown title="Car Management" id="car-management-dropdown">
                {/* 1. Xem danh sách: Công khai (Public) */}
                <NavDropdown.Item as={Link} to="/cars">
                  List all cars
                </NavDropdown.Item>

                {/* 2. Thêm mới: CHỈ HIỂN THỊ NẾU LÀ ADMIN (ROLE 1) */}
                {userRole === "1" && (
                  <>
                    <NavDropdown.Divider />
                    <NavDropdown.Item as={Link} to="/cars/new">
                      Create a new car
                    </NavDropdown.Item>
                  </>
                )}
              </NavDropdown>
            </Nav>

            <Nav className="align-items-center">
              {token ? (
                <>
                  <Navbar.Text className="me-3 text-light">
                    Welcome,{" "}
                    <span className="text-info fw-bold">{memberID}</span>
                  </Navbar.Text>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={handleLogout}
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <Button
                  variant="outline-light"
                  size="sm"
                  onClick={() => setShowLogin(true)}
                >
                  Login
                </Button>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Modal đăng nhập */}
      <LoginModal show={showLogin} onHide={() => setShowLogin(false)} />
    </>
  );
};

export default Header;
