// src/components/OrchidDetail.jsx
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Card, Button, Row, Col } from "react-bootstrap";
import { OrchidsData } from "../data/ListOfOrchidss"; // Đảm bảo đường dẫn đúng

const OrchidDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Tìm orchid theo id từ URL
  const orchid = OrchidsData.find((o) => o.id === id);

  if (!orchid) {
    return (
      <Container className="text-center mt-5">
        <h2>Không tìm thấy sản phẩm!</h2>
        <Button variant="secondary" onClick={() => navigate("/")}>
          Trở về trang chủ
        </Button>
      </Container>
    );
  }

  return (
    <Container className="mt-5 mb-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <div className="mb-3 text-start">
            <Button variant="dark" onClick={() => navigate(-1)}>
              &larr; Back
            </Button>
          </div>

          <Card className="shadow">
            <Card.Img
              variant="top"
              src={orchid.image}
              alt={orchid.orchidName}
              style={{ maxHeight: "500px", objectFit: "cover" }}
            />
            <Card.Body>
              <Card.Title className="display-5 text-primary">
                {orchid.orchidName}
              </Card.Title>

              <Card.Text as="div">
                <p>
                  <strong>Category:</strong> {orchid.category}
                </p>
                <p className="fs-4 text-danger fw-bold">
                  Price: ${orchid.price}
                </p>
                {orchid.isSpecial && (
                  <p className="badge bg-warning text-dark">★ Special Item</p>
                )}
                <hr />
                <h5>Description</h5>
                <p>{orchid.description}</p>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default OrchidDetail;
