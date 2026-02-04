import React from "react";
import { Modal, Button } from "react-bootstrap";

const ConfirmModal = ({ show, handleClose, title, body, onConfirm }) => {
  return (
    <Modal show={show} onHide={handleClose} centered backdrop="static">
      <Modal.Header closeButton className="bg-light">
        <Modal.Title>{title || "Xác nhận"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="py-2">
          {body || "Bạn có chắc chắn muốn thực hiện thao tác này?"}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Hủy bỏ
        </Button>
        <Button variant="danger" onClick={onConfirm}>
          Đồng ý
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmModal;
