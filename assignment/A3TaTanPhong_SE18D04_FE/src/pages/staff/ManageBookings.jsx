import React, { useEffect, useState } from "react";
import { Container, Table, Badge, Button, Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import bookingService from "../../services/bookingService";
import { formatCurrency } from "../../utils/formatCurrency";
import { formatDate } from "../../utils/formatDate";
import LoadingSpinner from "../../components/ui/LoadingSpinner";
import { useBookings } from "../../hooks/useBookings";

const ManageBookings = () => {
  const { bookings, loading, fetchAllBookings } = useBookings();
  const [showDetail, setShowDetail] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);

  useEffect(() => {
    fetchAllBookings();
  }, [fetchAllBookings]);

  const handleChangeStatus = async (id, status) => {
    if (!window.confirm("Xác nhận thực hiện thao tác này?")) return;
    try {
      await bookingService.updateBookingStatus(id, status);
      toast.success("Cập nhật trạng thái thành công");
      fetchAllBookings();
    } catch (error) {
      toast.error("Lỗi hệ thống khi cập nhật trạng thái");
    }
  };

  if (loading && bookings.length === 0)
    return <LoadingSpinner text="Đang tải danh sách đặt phòng..." />;

  return (
    <Container className="py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="fw-bold">Quản lý đặt phòng</h3>
        <Button
          variant="outline-secondary"
          size="sm"
          onClick={fetchAllBookings}
        >
          Làm mới
        </Button>
      </div>

      <Table
        striped
        bordered
        hover
        responsive
        className="align-middle shadow-sm"
      >
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Khách hàng</th>
            <th>Ngày đặt</th>
            <th>Tổng tiền</th>
            <th>Trạng thái</th>
            <th className="text-center">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {bookings.length > 0 ? (
            bookings.map((b) => (
              <tr key={b.bookingReservationId}>
                <td>{b.bookingReservationId}</td>
                <td>
                  <strong>{b.customer?.customerFullName}</strong>
                  <br />
                  <small className="text-muted">
                    {b.customer?.emailAddress}
                  </small>
                </td>
                <td>{formatDate(b.bookingDate)}</td>
                <td className="fw-bold text-primary">
                  {formatCurrency(b.totalPrice)}
                </td>
                <td>
                  <Badge
                    bg={
                      b.bookingStatus === 1
                        ? "warning"
                        : b.bookingStatus === 2
                          ? "success"
                          : "danger"
                    }
                  >
                    {b.bookingStatus === 1
                      ? "Chờ duyệt"
                      : b.bookingStatus === 2
                        ? "Đã duyệt"
                        : "Đã hủy"}
                  </Badge>
                </td>
                <td className="text-center">
                  <Button
                    variant="outline-secondary"
                    size="sm"
                    className="me-2"
                    onClick={() => {
                      setSelectedBooking(b);
                      setShowDetail(true);
                    }}
                  >
                    Chi tiết
                  </Button>
                  {b.bookingStatus === 1 && (
                    <>
                      <Button
                        variant="success"
                        size="sm"
                        className="me-2"
                        onClick={() =>
                          handleChangeStatus(b.bookingReservationId, 2)
                        }
                      >
                        Duyệt
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() =>
                          handleChangeStatus(b.bookingReservationId, 3)
                        }
                      >
                        Hủy
                      </Button>
                    </>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center py-4 text-muted">
                Chưa có dữ liệu đặt phòng.
              </td>
            </tr>
          )}
        </tbody>
      </Table>

      {/* Modal hiển thị chi tiết đơn */}
      <Modal
        show={showDetail}
        onHide={() => setShowDetail(false)}
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>
            Chi tiết đặt phòng #{selectedBooking?.bookingReservationId}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedBooking ? (
            <>
              <div className="mb-3">
                <p>
                  <strong>Khách hàng:</strong>{" "}
                  {selectedBooking.customer?.customerFullName}
                </p>
                <p>
                  <strong>Ngày đặt:</strong>{" "}
                  {formatDate(selectedBooking.bookingDate)}
                </p>
              </div>
              <Table striped bordered hover responsive>
                <thead className="table-secondary">
                  <tr>
                    <th>Số phòng</th>
                    <th>Ngày bắt đầu</th>
                    <th>Ngày kết thúc</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedBooking.bookingDetails?.map((d, idx) => (
                    <tr key={idx}>
                      <td>{d.roomInformation?.roomNumber || d.roomId}</td>
                      <td>{formatDate(d.startDate)}</td>
                      <td>{formatDate(d.endDate)}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </>
          ) : (
            <p>Không có dữ liệu.</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDetail(false)}>
            Đóng
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default ManageBookings;
