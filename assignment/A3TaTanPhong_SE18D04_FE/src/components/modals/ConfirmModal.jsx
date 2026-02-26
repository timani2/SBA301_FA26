import React from "react";
import { Modal, Button } from "react-bootstrap";

const ConfirmModal = ({
  show, // Hiển thị modal hay không (true/false)
  handleClose, // Hàm chạy khi bấm Hủy/Đóng
  handleConfirm, // Hàm chạy khi bấm Đồng ý
  title, // Tiêu đề
  body, // Lời nhắc
  confirmText = "Xác nhận",
  cancelText = "Hủy",
}) => {
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{body}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          {cancelText}
        </Button>
        <Button variant="danger" onClick={handleConfirm}>
          {confirmText}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmModal;
