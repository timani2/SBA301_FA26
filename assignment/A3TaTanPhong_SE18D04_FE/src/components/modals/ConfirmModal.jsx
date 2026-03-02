import React from "react";
import { Modal, Button } from "react-bootstrap";

const ConfirmModal = ({ show, onHide, onConfirm, title, message }) => {
  return (
    <Modal
      show={show}
      onHide={onHide}
      centered
      backdrop="static" // Ngăn đóng modal khi click ra ngoài để tránh mất state ID
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title className="text-danger">
          {title || "Xác nhận thao tác"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="mb-0">
          {message || "Bạn có chắc chắn muốn thực hiện hành động này?"}
        </p>
      </Modal.Body>
      <Modal.Footer>
        {/* Nút Hủy phải gọi hàm onHide để cập nhật state đóng ở trang cha */}
        <Button variant="secondary" onClick={onHide}>
          Hủy bỏ
        </Button>
        {/* Nút Xác nhận thực thi hàm xóa và sau đó phải được cha điều khiển đóng modal */}
        <Button variant="danger" onClick={onConfirm}>
          Đồng ý xóa
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmModal;
