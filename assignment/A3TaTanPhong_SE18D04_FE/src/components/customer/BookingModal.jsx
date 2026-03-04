import { useState, useEffect } from "react";
import { Modal, Button, Table, Form } from "react-bootstrap";
import { formatCurrency } from "../../utils/formatCurrency";
import { formatDate } from "../../utils/formatDate";

const STATUS_OPTIONS = [
  { value: "PENDING", label: "Chờ xử lý" },
  { value: "CONFIRMED", label: "Đã xác nhận" },
  { value: "CANCELLED", label: "Đã hủy" },
];

const getNights = (checkIn, checkOut) => {
  if (!checkIn || !checkOut) return 0;
  const d1 = new Date(checkIn);
  const d2 = new Date(checkOut);
  return Math.ceil((d2.getTime() - d1.getTime()) / (1000 * 60 * 60 * 24));
};

const BookingModal = ({ show, onHide, booking, isStaff = false, onStatusChange }) => {
  const [statusValue, setStatusValue] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (booking) setStatusValue(booking.status || "");
  }, [booking, show]);

  if (!booking) return null;

  const nights = getNights(booking.checkInDate, booking.checkOutDate);

  const handleSaveStatus = async () => {
    if (!onStatusChange || statusValue === booking.status) return;
    setSaving(true);
    try {
      await onStatusChange(booking.bookingId, statusValue);
      onHide();
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Chi tiết đơn đặt phòng #{booking.bookingId}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="mb-3">
          <p>
            <strong>Ngày đặt:</strong> {formatDate(booking.bookingDate)}
          </p>
          <p>
            <strong>Thời gian ở:</strong> {formatDate(booking.checkInDate)} →{" "}
            {formatDate(booking.checkOutDate)}
            {nights > 0 && (
              <span className="ms-2 badge bg-info">{nights} đêm</span>
            )}
          </p>
          <p>
            <strong>Tổng tiền:</strong>{" "}
            <span className="text-danger fw-bold">
              {formatCurrency(booking.totalAmount)}
            </span>
            {nights > 0 && (
              <span className="text-muted small ms-1">
                ({nights} đêm)
              </span>
            )}
          </p>
          <p>
            <strong>Trạng thái:</strong>{" "}
            {isStaff ? (
              <Form.Select
                value={statusValue}
                onChange={(e) => setStatusValue(e.target.value)}
                size="sm"
                style={{ width: "auto", display: "inline-block" }}
              >
                {STATUS_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </Form.Select>
            ) : (
              booking.status
            )}
          </p>
        </div>

        <h6>Danh sách phòng:</h6>
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>Số phòng</th>
              <th>Giá/đêm</th>
              {nights > 0 && <th className="text-end">Tạm tính</th>}
            </tr>
          </thead>
          <tbody>
            {booking.rooms &&
              booking.rooms.map((detail, index) => (
                <tr key={detail.roomId ?? index}>
                  <td>Phòng {detail.roomNumber}</td>
                  <td>{formatCurrency(detail.priceAtBooking)}</td>
                  {nights > 0 && (
                    <td className="text-end">
                      {formatCurrency(detail.priceAtBooking)} × {nights} đêm ={" "}
                      {formatCurrency((detail.priceAtBooking || 0) * nights)}
                    </td>
                  )}
                </tr>
              ))}
          </tbody>
        </Table>
      </Modal.Body>
      <Modal.Footer>
        {isStaff && statusValue !== booking.status && (
          <Button
            variant="primary"
            onClick={handleSaveStatus}
            disabled={saving}
            className="me-2"
          >
            {saving ? "Đang lưu..." : "Lưu trạng thái"}
          </Button>
        )}
        <Button variant="secondary" onClick={onHide}>
          Đóng
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default BookingModal;
