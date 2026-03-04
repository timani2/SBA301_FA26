import { useEffect, useState } from "react";
import { Table, Button, Badge } from "react-bootstrap";
import { useBookings } from "../../hooks/useBookings";
import { bookingService } from "../../services/bookingService";
import { toast } from "react-toastify";
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

  const handleStatusChange = async (bookingId, status) => {
    const res = await bookingService.updateBookingStatus(bookingId, status);
    toast.success(res?.message || "Cập nhật trạng thái thành công!");
    fetchAllBookings();
  };

  if (loading)
    return <div className="text-center mt-5">Đang tải đơn đặt phòng...</div>;

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
            <th>Số đêm</th>
            <th>Tổng tiền</th>
            <th>Trạng thái</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {bookings && bookings.length > 0 ? (
            bookings.map((b) => {
              const nights = getNights(b.checkInDate, b.checkOutDate);
              return (
              <tr key={b.bookingId}>
                <td>#{b.bookingId}</td>
                <td>{b.customerFullName ?? "—"}</td>
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
                  {b.status === "PENDING" && (
                    <Button
                      variant="success"
                      size="sm"
                      className="ms-2"
                      onClick={() => {
                        if (window.confirm("Xác nhận đơn đặt phòng này?")) {
                          handleStatusChange(b.bookingId, "CONFIRMED");
                        }
                      }}
                    >
                      Xác nhận
                    </Button>
                  )}
                </td>
              </tr>
            );
            })
          ) : (
            <tr>
              <td colSpan="8" className="text-center">
                Chưa có đơn đặt phòng nào.
              </td>
            </tr>
          )}
        </tbody>
      </Table>

      <BookingModal
        show={showModal}
        onHide={() => setShowModal(false)}
        booking={selectedBooking}
        isStaff
        onStatusChange={handleStatusChange}
      />
    </div>
  );
};

export default ManageBookings;
