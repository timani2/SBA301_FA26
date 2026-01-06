import { Container, Row, Col, Image } from "react-bootstrap";

function Footer() {
  return (
    <footer className="bg-light py-4 border-top">
      <Container>
        <Row className="align-items-center">
          <Col xs="auto">
            <Image
              src="https://cdn2.fptshop.com.vn/unsafe/800x0/meme_cho_1_e568e5b1a5.jpg"
              roundedCircle
              width={50}
              height={50}
              alt="avatar"
            />
          </Col>
          <Col>
            <h6 className="mb-0">Tác giả: phongtt</h6>
            <p className="mb-0 text-muted small">All rights reserved</p>
          </Col>
          <Col xs="auto" className="ms-auto">
            <h6 className="mb-0">Thông tin liên hệ</h6>
            <p className="mb-0">sw.phongtt@gmail.com</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
