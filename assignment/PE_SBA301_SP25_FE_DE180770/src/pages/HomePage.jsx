import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import carService from "../services/carService";

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
            <Card className="h-100 shadow-sm border-0 hover-shadow transition">
              <Card.Img
                variant="top"
                src={`https://placehold.co/600x400?text=${car.carName}`}
                alt={car.carName}
                style={{ height: "180px", objectFit: "cover" }}
              />

              <Card.Body className="d-flex flex-column">
                <div className="d-flex justify-content-between align-items-start mb-2">
                  <Card.Title className="fs-5 fw-bold mb-0">
                    {car.carName}
                  </Card.Title>
                  <Badge bg="info" pill>
                    {car.countryName}
                  </Badge>
                </div>

                <Card.Text className="text-muted small mb-3">
                  ID: {car.carID} | Created:{" "}
                  {new Date(car.createdAt).toLocaleDateString()}
                </Card.Text>

                <div className="mt-auto">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <span className="text-muted small d-block">Price</span>
                      <span className="fs-5 fw-bold text-primary">
                        ${car.unitPrice.toLocaleString()}
                      </span>
                    </div>
                    <div className="text-end">
                      <span className="text-muted small d-block">
                        Inventory
                      </span>
                      <span
                        className={
                          car.unitsInStock < 10
                            ? "text-danger fw-bold"
                            : "text-success fw-bold"
                        }
                      >
                        {car.unitsInStock} units
                      </span>
                    </div>
                  </div>
                </div>
              </Card.Body>
            </Card>
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
