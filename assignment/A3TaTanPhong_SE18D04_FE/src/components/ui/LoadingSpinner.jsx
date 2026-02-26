import React from "react";
import { Spinner } from "react-bootstrap";

const LoadingSpinner = ({ text = "Đang xử lý..." }) => {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center py-5">
      <Spinner animation="border" variant="primary" role="status" />
      <span className="mt-2 text-muted">{text}</span>
    </div>
  );
};

export default LoadingSpinner;
