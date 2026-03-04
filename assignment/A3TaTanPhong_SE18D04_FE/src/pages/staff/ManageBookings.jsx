import { useEffect, useState } from "react";
import { Table, Button, Badge } from "react-bootstrap";
import { useBookings } from "../../hooks/useBookings";
import { formatDate } from "../../utils/formatDate";
import { formatCurrency } from "../../utils/formatCurrency";
import BookingModal from "../../components/customer/BookingModal";

const ManageBookings = () => {
  const { bookings, loading, fetchAllBookings } = useBookings();
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchAllBookings();
  }, [fetchAllBookings]);

  const handleViewDetail = (booking) => {
    setSelectedBooking(booking);
    setShowModal(true);
  };

  if (loading) return <div>Đang tải đơn đặt phòng...</div>;

  return (
    <div>
      <h2 className="mb-4">Quản lý đặt phòng</h2>
      <Table striped bordered hover responsive>
        <thead className="table-dark">
          <tr>
            <th>Mã đơn</th>
            <th>Khách hàng</th>
            <th>Ngày đặt</th>
            <th>Thời gian ở</th>
            <th>Tổng tiền</th>
            <th>Trạng thái</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((b) => (
            <tr key={b.id}>
              <td>#{b.id}</td>
              <td>{b.customerName}</td>
              <td>{formatDate(b.bookingDate)}</td>
              <td>
                {formatDate(b.arrivalDate)} - {formatDate(b.departureDate)}
              </td>
              <td className="fw-bold text-danger">
                {formatCurrency(b.bookingTotalPrice)}
              </td>
              <td>
                <Badge
                  bg={b.bookingStatus === "CONFIRMED" ? "success" : "secondary"}
                >
                  {b.bookingStatus}
                </Badge>
              </td>
              <td>
                <Button
                  variant="info"
                  size="sm"
                  onClick={() => handleViewDetail(b)}
                >
                  Chi tiết
                </Button>
              </td>
            </tr>
          ))}
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

export default ManageBookings;
