import React, { useEffect, useContext, useState } from "react";
import { Container, Table, Badge } from "react-bootstrap";
import { AuthContext } from "../../contexts/AuthContext";
import { useBookings } from "../../hooks/useBookings";
import { useCustomers } from "../../hooks/useCustomers";
import { formatDate } from "../../utils/formatDate";
import { formatCurrency } from "../../utils/formatCurrency";
import LoadingSpinner from "../../components/ui/LoadingSpinner";

const BookingHistory = () => {
  const { user } = useContext(AuthContext);
  const { bookings, loading: loadingBookings, fetchMyHistory } = useBookings();
  const {
    customers,
    loading: loadingCustomers,
    fetchAllCustomers,
  } = useCustomers();

  const [myId, setMyId] = useState(null);

  // 1. Lấy danh sách khách hàng để tìm ID của mình
  useEffect(() => {
    fetchAllCustomers();
  }, [fetchAllCustomers]);

  // 2. Từ Email -> Suy ra ID -> Gọi API lấy lịch sử đặt phòng
  useEffect(() => {
    if (customers.length > 0 && user) {
      const myInfo = customers.find((c) => c.emailAddress === user.email);
      if (myInfo) {
        setMyId(myInfo.customerId);
        fetchMyHistory(myInfo.customerId);
      }
    }
  }, [customers, user, fetchMyHistory]);

  if ((loadingBookings || loadingCustomers) && bookings.length === 0) {
    return <LoadingSpinner text="Đang tải lịch sử đặt phòng..." />;
  }

  return (
    <Container className="py-4">
      <h3 className="fw-bold mb-4">Lịch Sử Đặt Phòng</h3>

      <Table
        striped
        bordered
        hover
        responsive
        className="align-middle shadow-sm"
      >
        <thead className="table-dark">
          <tr>
            <th>Mã Đơn</th>
            <th>Ngày Đặt</th>
            <th>Tổng Tiền</th>
            <th>Trạng Thái</th>
          </tr>
        </thead>
        <tbody>
          {bookings.length > 0 ? (
            bookings.map((booking) => (
              <tr key={booking.bookingReservationId}>
                <td className="fw-bold text-primary">
                  #{booking.bookingReservationId}
                </td>
                <td>{formatDate(booking.bookingDate)}</td>
                <td className="text-danger fw-bold">
                  {formatCurrency(booking.totalPrice)}
                </td>
                <td>
                  <Badge
                    bg={booking.bookingStatus === 1 ? "success" : "secondary"}
                  >
                    {booking.bookingStatus === 1 ? "Đã xác nhận" : "Đã hủy"}
                  </Badge>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center py-4 text-muted">
                Bạn chưa có lịch sử đặt phòng nào.
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </Container>
  );
};

export default BookingHistory;
