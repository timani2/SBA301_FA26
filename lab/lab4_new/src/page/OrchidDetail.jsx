// src/page/OrchidDetail.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container,
  Card,
  Button,
  Row,
  Col,
  Spinner,
  Alert,
  Badge,
} from "react-bootstrap";
import { OrchidService } from "../service/OrchidService";

const OrchidDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [orchid, setOrchid] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDetail = async () => {
      try {
        const data = await OrchidService.getOrchidById(id);
        setOrchid(data);
      } catch (err) {
        console.error("Lỗi:", err);
      } finally {
        setLoading(false);
      }
    };
    loadDetail();
  }, [id]);

  if (loading)
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" />
      </Container>
    );
  if (!orchid)
    return (
      <Container className="mt-5">
        <Alert variant="danger">Không tìm thấy sản phẩm!</Alert>
      </Container>
    );

  return (
    <Container className="mt-5 mb-5">
      <Button
        variant="outline-secondary"
        className="mb-4"
        onClick={() => navigate(-1)}
      >
        &larr; Quay lại
      </Button>
      <Card className="shadow-lg border-0 overflow-hidden">
        <Card.Body className="p-0">
          <Row className="g-0">
            <Col md={6} className="position-relative">
              <div
                className="position-absolute"
                style={{
                  top: "20px",
                  left: "20px",
                  zIndex: 1,
                  display: "flex",
                  gap: "10px",
                }}
              >
                {orchid.isAttractive && (
                  <Badge bg="warning" text="dark" className="p-2 shadow">
                    ✨ Đặc biệt
                  </Badge>
                )}
                {orchid.isNatural && (
                  <Badge bg="success" className="p-2 shadow">
                    🌿 Tự nhiên
                  </Badge>
                )}
              </div>
              <Card.Img
                src={orchid.orchidURL}
                style={{
                  height: "100%",
                  objectFit: "cover",
                  minHeight: "450px",
                }}
              />
            </Col>
            <Col md={6} className="p-5">
              <h1 className="display-5 fw-bold text-primary">
                {orchid.orchidName}
              </h1>
              <Badge bg="info" className="mb-3 fs-6">
                {orchid.orchidCategory?.categoryName}
              </Badge>
              <h2 className="text-danger fw-bold mb-4">Giá: ${orchid.price}</h2>
              <hr />
              <h5 className="fw-bold">Mô tả sản phẩm:</h5>
              <p
                className="text-muted"
                style={{ lineHeight: "1.8", whiteSpace: "pre-line" }}
              >
                {orchid.orchidDescription}
              </p>
              <Button
                variant="success"
                size="lg"
                className="mt-4 px-5 fw-bold shadow"
              >
                Mua ngay
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default OrchidDetail;
