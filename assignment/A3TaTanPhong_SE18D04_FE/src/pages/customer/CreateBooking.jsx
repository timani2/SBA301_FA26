import React from "react";
import { Container } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import BookingForm from "../../components/customer/BookingForm";

const CreateBooking = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const roomParam = params.get("room");
  const initialRoomId = roomParam ? parseInt(roomParam, 10) : null;

  return (
    <Container className="py-4">
      <h3 className="fw-bold mb-4">Đặt phòng trực tuyến</h3>
      <BookingForm
        initialRoomIds={initialRoomId ? [initialRoomId] : []}
        onSuccess={() => navigate("/customer/history")}
      />
    </Container>
  );
};

export default CreateBooking;
