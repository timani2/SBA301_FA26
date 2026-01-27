// src/components/OrchidDetail.jsx
import React, { useState, useEffect } from "react"; // <-- CODE MỚI: Thêm useState, useEffect
import { useParams, useNavigate } from "react-router-dom";
import {
  Container,
  Card,
  Button,
  Row,
  Col,
  Spinner,
  Alert,
} from "react-bootstrap";
// import { OrchidsData } from "../data/ListOfOrchidss";
import { fetchOrchidById } from "../service/OrchidService";

const OrchidDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // --- CODE MỚI: State ---
  const [orchid, setOrchid] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // ----------------------

  // Tìm orchid theo id từ file tĩnh
  // const orchid = OrchidsData.find((o) => o.id === id);

  // --- Gọi API lấy chi tiết ---
  useEffect(() => {
    const loadDetail = async () => {
      try {
        setLoading(true);
        const data = await fetchOrchidById(id);
        setOrchid(data);
      } catch (err) {
        setError("Không tìm thấy sản phẩm hoặc lỗi kết nối.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadDetail();
  }, [id]);
  // --------------------------------------

  // ---  UI Loading ---
  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" variant="primary" />
      </Container>
    );
  }
  // ----------------------------

  // if (!orchid) { // <-- CODE truoc khi lay du lieu tu API
  if (error || !orchid) {
    return (
      <Container className="text-center mt-5">
        {/* <h2>Không tìm thấy sản phẩm!</h2> code truoc khi lay du lieu tu API*/}
        <Alert variant="danger">{error || "Sản phẩm không tồn tại"}</Alert>{" "}
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
            <Card.Body>
              <Row>
                <Col md={6}>
                  <Card.Img
                    src={orchid.image}
                    alt={orchid.orchidName}
                    style={{
                      width: "100%",
                      height: "auto",
                      maxHeight: "400px",
                      objectFit: "cover",
                    }}
                  />
                </Col>
                <Col md={6}>
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
                      <p className="badge bg-warning text-dark">
                        ★ Special Item
                      </p>
                    )}
                    <hr />
                    <h5>Description</h5>
                    <p>{orchid.description}</p>
                  </Card.Text>
                  <Button
                    variant="success"
                    size="lg"
                    onClick={() => alert("Đã thêm vào giỏ hàng!")}
                  >
                    Add To Cart
                  </Button>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default OrchidDetail;
