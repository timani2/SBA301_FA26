import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Container, Row, Col, ListGroup } from "react-bootstrap";
import { useLocation, Link } from "react-router-dom";
import { authService } from "../../services/authService";

const Layout = ({ children }) => {
  const location = useLocation();
  const user = authService.getCurrentUser();

  return (
    <div className="d-flex flex-column min-vh-100">
      {/* Header nằm trên cùng */}
      <Header />

      <div className="flex-grow-1 d-flex">
        {/* Sidebar nằm bên trái - Chỉ hiện khi đã đăng nhập */}
        {user && (
          <aside
            className="bg-light border-end"
            style={{ width: "250px", minHeight: "100%" }}
          >
            <ListGroup variant="flush" className="p-3 primary-bg-light">
              <div className="mb-4 text-center">
                <small className="text-muted text-uppercase fw-bold">
                  Menu Management
                </small>
              </div>

              {user.accountRole === 1 && (
                <ListGroup.Item
                  action
                  as={Link}
                  to="/admin/accounts"
                  active={location.pathname === "/admin/accounts"}
                >
                  Account Management
                </ListGroup.Item>
              )}

              {user.accountRole === 2 && (
                <>
                  <ListGroup.Item
                    action
                    as={Link}
                    to="/staff/categories"
                    active={location.pathname === "/staff/categories"}
                  >
                    Categories
                  </ListGroup.Item>
                  <ListGroup.Item
                    action
                    as={Link}
                    to="/staff/news"
                    active={location.pathname === "/staff/news"}
                  >
                    News Articles
                  </ListGroup.Item>
                </>
              )}
            </ListGroup>
          </aside>
        )}

        {/* Main Content nằm ở giữa */}
        <main className="flex-grow-1 p-4 bg-white">
          <Container fluid>{children}</Container>
        </main>
      </div>

      {/* Footer nằm dưới cùng */}
      <Footer />
    </div>
  );
};

export default Layout;
