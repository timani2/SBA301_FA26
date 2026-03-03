import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import carService from "../services/carService";
import CarCard from "../components/cars/CarCard";

const HomePage = () => {
  const [cars, setCars] = useState([]);
  const userRole = localStorage.getItem("role");

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    try {
      const res = await carService.getAllCars();
      setCars(res.data);
    } catch (err) {
      console.error("Error fetching cars:", err);
    }
  };

  return (
    <Container className="py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">Available Cars</h2>
        {/* Nút Add New Car vẫn giữ lại ở đầu trang để Admin có lối vào chức năng Create */}
        {userRole === "1" && (
          <Button as={Link} to="/cars/new" variant="success">
            + Add New Car
          </Button>
        )}
      </div>

      <Row xs={1} md={2} lg={3} xl={4} className="g-4">
        {cars.map((car) => (
          <Col key={car.carID}>
            <CarCard car={car} maxWidth="100%" />
          </Col>
        ))}
      </Row>

      {cars.length === 0 && (
        <div className="text-center mt-5 py-5 border rounded bg-light">
          <p className="text-muted">No cars available in the inventory.</p>
        </div>
      )}
    </Container>
  );
};

export default HomePage;
