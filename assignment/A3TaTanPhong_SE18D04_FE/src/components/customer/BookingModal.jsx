import React from "react";
import { Modal } from "react-bootstrap";
import BookingForm from "./BookingForm";

const BookingModal = ({ show, onHide, initialRoomId }) => {
  const initial = initialRoomId ? [initialRoomId] : [];
  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Đặt Phòng</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <BookingForm
          initialRoomIds={initial}
          onSuccess={() => {
            // close modal after success
            if (onHide) onHide();
          }}
          onClose={onHide}
        />
      </Modal.Body>
    </Modal>
  );
};

export default BookingModal;
