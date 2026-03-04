import { useEffect, useState } from "react";
import { Table, Button, Badge } from "react-bootstrap";
import { useBookings } from "../../hooks/useBookings";
import { formatDate } from "../../utils/formatDate";
import { formatCurrency } from "../../utils/formatCurrency";
import BookingModal from "../../components/customer/BookingModal";

const getNights = (checkIn, checkOut) => {
  if (!checkIn || !checkOut) return 0;
  const d1 = new Date(checkIn);
  const d2 = new Date(checkOut);
  const diff = d2.getTime() - d1.getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
};

const BookingHistory = () => {
  const { bookings, loading, fetchMyHistory } = useBookings();
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchMyHistory();
  }, [fetchMyHistory]);

  const handleViewDetail = (booking) => {
    setSelectedBooking(booking);
    setShowModal(true);
  };

  if (loading) return <div>Đang tải lịch sử...</div>;

  return (
    <div>
      <h2 className="mb-4">Lịch sử đặt phòng</h2>
      <Table striped bordered hover responsive>
        <thead className="table-dark">
          <tr>
            <th>Mã đơn</th>
            <th>Ngày đặt</th>
            <th>Thời gian ở</th>
            <th>Số đêm</th>
            <th>Tổng tiền</th>
            <th>Trạng thái</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {bookings.length > 0 ? (
            bookings.map((b) => {
              const nights = getNights(b.checkInDate, b.checkOutDate);
              return (
              <tr key={b.bookingId}>
                <td>#{b.bookingId}</td>
                <td>{formatDate(b.bookingDate)}</td>
                <td>
                  {formatDate(b.checkInDate)} → {formatDate(b.checkOutDate)}
                </td>
                <td className="text-center">
                  <Badge bg="info">{nights} đêm</Badge>
                </td>
                <td className="fw-bold text-danger">
                  {formatCurrency(b.totalAmount)}
                  {nights > 0 && (
                    <span className="text-muted fw-normal small d-block">
                      tổng {nights} đêm
                    </span>
                  )}
                </td>
                <td>
                  <Badge
                    bg={
                      b.status === "CONFIRMED" ? "success" : "secondary"
                    }
                  >
                    {b.status}
                  </Badge>
                </td>
                <td>
                  <Button
                    variant="outline-info"
                    size="sm"
                    onClick={() => handleViewDetail(b)}
                  >
                    Chi tiết
                  </Button>
                </td>
              </tr>
            );
            })
          ) : (
            <tr>
              <td colSpan="7" className="text-center">
                Bạn chưa có đơn đặt phòng nào.
              </td>
            </tr>
          )}
        </tbody>
      </Table>

      <BookingModal
        show={showModal}
        onHide={() => setShowModal(false)}
        booking={selectedBooking}
      />
    </div>
  );
};

export default BookingHistory;
