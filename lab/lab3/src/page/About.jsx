import { Container, Row, Col, Card } from "react-bootstrap";

function About() {
  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <Card className="shadow-lg border-0 rounded-3">
            {/* Header màu xanh giống trang Contact */}
            <Card.Header className="bg-primary text-white text-center py-3 rounded-top-3">
              <h3 className="mb-0 fw-bold">Giới thiệu</h3>
            </Card.Header>

            <Card.Body className="p-4">
              <div className="text-center mb-4">
                <p className="lead">
                  Đây là trang giới thiệu về trang web của chúng tôi.
                </p>
              </div>

              <hr className="my-4" />

              <div className="contact-info">
                <h5 className="text-primary fw-bold mb-3">Thông tin liên hệ</h5>
                <p className="mb-2">
                  <strong>Email:</strong>{" "}
                  <span className="text-muted">sw.phongtt@gmail.com</span>
                </p>
                <p className="mb-0">
                  <strong>Số điện thoại:</strong>{" "}
                  <span className="text-muted">0123 456 789</span>
                </p>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default About;
