import React from "react";
import { Container } from "react-bootstrap";

const Footer = () => {
  return (
    <footer className="bg-light text-center py-4 mt-auto border-top">
      <Container>
        <p className="mb-0 text-muted">
          &copy; {new Date().getFullYear()} FUMiniHotelSystem. Assignment 3 -
          Lớp SE18D04.
        </p>
      </Container>
    </footer>
  );
};

export default Footer;
