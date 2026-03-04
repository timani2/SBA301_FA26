import { Modal, Button, Table } from "react-bootstrap";
import { formatCurrency } from "../../utils/formatCurrency";
import { formatDate } from "../../utils/formatDate";

const BookingModal = ({ show, onHide, booking }) => {
  if (!booking) return null;

  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Chi tiết đơn đặt phòng #{booking.id}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="mb-3">
          <p>
            <strong>Ngày đặt:</strong> {formatDate(booking.bookingDate)}
          </p>
          <p>
            <strong>Thời gian:</strong> {formatDate(booking.arrivalDate)} -{" "}
            {formatDate(booking.departureDate)}
          </p>
          <p>
            <strong>Tổng tiền:</strong>{" "}
            <span className="text-danger fw-bold">
              {formatCurrency(booking.bookingTotalPrice)}
            </span>
          </p>
          <p>
            <strong>Trạng thái:</strong> {booking.bookingStatus}
          </p>
        </div>

        <h6>Danh sách phòng:</h6>
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>Số phòng</th>
              <th>Mô tả</th>
              <th>Giá/Ngày</th>
            </tr>
          </thead>
          <tbody>
            {/* Truy cập mảng chi tiết từ BookingResponse của BE */}
            {booking.details &&
              booking.details.map((detail, index) => (
                <tr key={index}>
                  <td>{detail.roomNumber}</td>
                  <td>{detail.roomDescription}</td>
                  <td>{formatCurrency(detail.actualPrice)}</td>
                </tr>
              ))}
          </tbody>
        </Table>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Đóng
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default BookingModal;
