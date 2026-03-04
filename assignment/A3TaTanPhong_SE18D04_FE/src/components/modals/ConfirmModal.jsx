import { Modal, Button } from "react-bootstrap";

const ConfirmModal = ({ show, onHide, onConfirm, title, message }) => {
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>{title || "Xác nhận hành động"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {message || "Bạn có chắc chắn muốn thực hiện hành động này không?"}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Hủy bỏ
        </Button>
        <Button variant="danger" onClick={onConfirm}>
          Xác nhận
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmModal;
