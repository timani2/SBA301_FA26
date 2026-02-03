import React from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user")); // Lấy thông tin user sau khi login

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
      <Container>
        <Navbar.Brand as={Link} to="/">
          FU News Management
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {/* Menu cho khách vãng lai */}
            {!user && (
              <Nav.Link as={Link} to="/">
                Home News
              </Nav.Link>
            )}

            {/* Menu cho Admin [cite: 38, 43] */}
            {user && user.accountRole === 1 && (
              <Nav.Link as={Link} to="/admin/accounts">
                Account Management
              </Nav.Link>
            )}

            {/* Menu cho Staff [cite: 39, 45, 46, 47, 48, 49] */}
            {user && user.accountRole === 2 && (
              <>
                <Nav.Link as={Link} to="/staff/categories">
                  Categories
                </Nav.Link>
                <Nav.Link as={Link} to="/staff/news">
                  News Articles
                </Nav.Link>
                <Nav.Link as={Link} to="/staff/history">
                  My History
                </Nav.Link>
                <Nav.Link as={Link} to="/staff/profile">
                  My Profile
                </Nav.Link>
              </>
            )}
          </Nav>
          <Nav>
            {user ? (
              <div className="d-flex align-items-center">
                <span className="text-light me-3">
                  Welcome, {user.accountName}
                </span>
                <Button
                  variant="outline-light"
                  size="sm"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </div>
            ) : (
              <Nav.Link as={Link} to="/login">
                Login
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
