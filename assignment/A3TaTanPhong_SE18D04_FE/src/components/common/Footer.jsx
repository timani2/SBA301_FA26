import { Container } from "react-bootstrap";

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-3 mt-auto">
      <Container className="text-center">
        <p className="mb-0">
          © 2026 Hotel Management System - Ta Tan Phong SE18D04
        </p>
        <small className="text-muted">
          Hệ thống tích hợp Spring Boot & React
        </small>
      </Container>
    </footer>
  );
};

export default Footer;
