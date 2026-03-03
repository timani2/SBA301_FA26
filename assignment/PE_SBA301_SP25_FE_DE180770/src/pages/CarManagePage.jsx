import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import CarTable from "../components/cars/CarTable";
import authService from "../services/authService";

const CarManagePage = () => {
  const navigate = useNavigate();
  const userRole = authService.getCurrentUserRole(); // Admin = 1

  return (
    <Container className="mt-4">
      <Row className="align-items-center mb-4">
        <Col>
          <h2>Cars Management Dashboard</h2>
        </Col>
        <Col className="text-end">
          {/* Chỉ Admin (Role 1) mới được phép Create a new car [cite: 34] */}
          {userRole === "1" && (
            <Button variant="success" onClick={() => navigate("/cars/new")}>
              + Create New Car
            </Button>
          )}
        </Col>
      </Row>

      <Row>
        <Col>
          {/* Component hiển thị bảng danh sách xe  */}
          {/* Chức năng xem danh sách không yêu cầu quyền (No permission)  */}
          <CarTable />
        </Col>
      </Row>
    </Container>
  );
};

export default CarManagePage;
