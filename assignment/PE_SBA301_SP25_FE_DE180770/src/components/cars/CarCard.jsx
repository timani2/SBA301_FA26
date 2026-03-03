import React from "react";
import { Card, Badge } from "react-bootstrap";

const CarCard = ({ car = {}, style = {}, maxWidth = "350px" }) => {
  const name = car.carName || car.name || "Vehicle Name";
  const countryName =
    car.countryName || car.country?.countryName || car.countryName || "Origin";
  const id = car.carID || car.id || "New";
  const createdAt = car.createdAt ? new Date(car.createdAt) : new Date();
  const unitPrice = Number(car.unitPrice || car.price || 0);
  const unitsInStock = Number(car.unitsInStock ?? car.stock ?? 0);

  return (
    <Card
      className="shadow-sm border-0 hover-shadow transition mx-auto"
      style={{ maxWidth, ...style }}
    >
      <Card.Img
        variant="top"
        src={`https://placehold.co/600x400?text=${encodeURIComponent(name)}`}
        alt={name}
        style={{ height: "200px", objectFit: "cover" }}
      />

      <Card.Body className="d-flex flex-column">
        <div className="d-flex justify-content-between align-items-start mb-2">
          <Card.Title
            className="fs-5 fw-bold mb-0 text-truncate"
            style={{ maxWidth: "180px" }}
          >
            {name}
          </Card.Title>
          <Badge bg="info" pill>
            {countryName}
          </Badge>
        </div>

        <Card.Text className="text-muted small mb-3">
          ID: {id} | Created: {createdAt.toLocaleDateString()}
        </Card.Text>

        <div className="mt-auto">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <span className="text-muted small d-block">Price</span>
              <span className="fs-5 fw-bold text-primary">
                ${unitPrice.toLocaleString()}
              </span>
            </div>
            <div className="text-end">
              <span className="text-muted small d-block">Inventory</span>
              <span
                className={
                  unitsInStock < 10
                    ? "text-danger fw-bold"
                    : "text-success fw-bold"
                }
              >
                {unitsInStock} units
              </span>
            </div>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default CarCard;
