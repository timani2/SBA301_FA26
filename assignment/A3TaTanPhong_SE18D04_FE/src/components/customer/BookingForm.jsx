import React, { useEffect, useState, useContext } from "react";
import { Form, Button, Table, Row, Col } from "react-bootstrap";
import { toast } from "react-toastify";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useRooms } from "../../hooks/useRooms";
import { useCustomers } from "../../hooks/useCustomers";
import { useBookings } from "../../hooks/useBookings";
import { AuthContext } from "../../contexts/AuthContext";
import LoadingSpinner from "../ui/LoadingSpinner";
import { formatCurrency } from "../../utils/formatCurrency";
import { formatDateForBackend } from "../../utils/formatDate";

const BookingForm = ({
  initialRoomIds = [],
  onSuccess = null,
  onClose = null,
}) => {
  const { rooms, loading: loadingRooms, fetchRooms } = useRooms();
  const {
    customers,
    loading: loadingCustomers,
    fetchAllCustomers,
  } = useCustomers();
  const { createBooking, loading: loadingBooking } = useBookings();
  const { user } = useContext(AuthContext);

  const [selectedRoomIds, setSelectedRoomIds] = useState(initialRoomIds);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(
    new Date(new Date().setDate(new Date().getDate() + 1)),
  );
  const [myId, setMyId] = useState(null);

  useEffect(() => {
    fetchRooms();
    fetchAllCustomers();
  }, [fetchRooms, fetchAllCustomers]);

  useEffect(() => {
    if (customers.length > 0 && user) {
      const me = customers.find((c) => c.emailAddress === user.email);
      if (me) setMyId(me.customerId);
    }
  }, [customers, user]);

  useEffect(() => {
    setSelectedRoomIds(initialRoomIds || []);
  }, [initialRoomIds]);

  const handleToggleRoom = (roomId) => {
    setSelectedRoomIds((prev) =>
      prev.includes(roomId)
        ? prev.filter((id) => id !== roomId)
        : [...prev, roomId],
    );
  };

  const calculateTotal = () => {
    if (!startDate || !endDate) return 0;
    const days = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
    if (days <= 0) return 0;
    let sum = 0;
    rooms.forEach((r) => {
      if (selectedRoomIds.includes(r.roomId)) {
        sum += r.roomPricePerDay * days;
      }
    });
    return sum;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!myId) {
      toast.error("Không tìm thấy thông tin khách hàng!");
      return;
    }
    if (selectedRoomIds.length === 0) {
      toast.error("Vui lòng chọn ít nhất một phòng.");
      return;
    }
    if (!startDate || !endDate) {
      toast.error("Vui lòng chọn ngày bắt đầu và kết thúc.");
      return;
    }
    if (endDate <= startDate) {
      toast.error("Ngày kết thúc phải sau ngày bắt đầu.");
      return;
    }

    const details = selectedRoomIds.map((roomId) => ({
      roomId,
      startDate: formatDateForBackend(startDate),
      endDate: formatDateForBackend(endDate),
    }));

    const bookingData = {
      totalPrice: calculateTotal(),
      bookingStatus: 1,
      customer: { customerId: myId },
      bookingDetails: details,
    };

    const success = await createBooking(bookingData);
    if (success) {
      toast.success("Đặt phòng thành công!");
      if (onSuccess) onSuccess();
      if (onClose) onClose();
    }
  };

  if (loadingRooms || loadingCustomers || loadingBooking) {
    return <LoadingSpinner text="Đang chuẩn bị dữ liệu..." />;
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Row className="mb-4">
        <Col md={6}>
          <Form.Group controlId="startDate" className="d-flex flex-column">
            <Form.Label className="fw-bold">Ngày bắt đầu</Form.Label>
            <DatePicker
              selected={startDate}
              onChange={(date) => {
                setStartDate(date);
                if (date >= endDate) {
                  const nextDay = new Date(date);
                  nextDay.setDate(nextDay.getDate() + 1);
                  setEndDate(nextDay);
                }
              }}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              minDate={new Date()}
              dateFormat="yyyy-MM-dd"
              className="form-control"
              placeholderText="Chọn ngày bắt đầu"
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group controlId="endDate" className="d-flex flex-column">
            <Form.Label className="fw-bold">Ngày kết thúc</Form.Label>
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
              dateFormat="yyyy-MM-dd"
              className="form-control"
              placeholderText="Chọn ngày kết thúc"
            />
          </Form.Group>
        </Col>
      </Row>

      <Table
        striped
        bordered
        hover
        responsive
        className="align-middle shadow-sm mb-4"
      >
        <thead className="table-dark">
          <tr>
            <th className="text-center" style={{ width: "50px" }}>
              Chọn
            </th>
            <th>Số phòng</th>
            <th>Giá/ngày</th>
            <th>Trạng thái</th>
          </tr>
        </thead>
        <tbody>
          {rooms.length > 0 ? (
            rooms.map((r) => (
              <tr key={r.roomId}>
                <td className="text-center">
                  <Form.Check
                    type="checkbox"
                    checked={selectedRoomIds.includes(r.roomId)}
                    onChange={() => handleToggleRoom(r.roomId)}
                    disabled={r.roomStatus !== 1}
                  />
                </td>
                <td>{r.roomNumber}</td>
                <td>{formatCurrency(r.roomPricePerDay)}</td>
                <td>
                  {r.roomStatus === 1 ? (
                    <span className="text-success fw-bold">Khả dụng</span>
                  ) : (
                    <span className="text-danger">Đã đặt/Bảo trì</span>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center py-3">
                Không có phòng khả dụng
              </td>
            </tr>
          )}
        </tbody>
      </Table>

      <div className="d-flex justify-content-between align-items-center p-3 bg-light rounded shadow-sm">
        <div>
          <span className="h5 mb-0">Tổng tiền dự tính: </span>
          <span className="h4 mb-0 text-primary fw-bold">
            {formatCurrency(calculateTotal())}
          </span>
        </div>
        <div>
          <Button
            type="submit"
            variant="success"
            size="lg"
            className="px-4 fw-bold"
            disabled={selectedRoomIds.length === 0}
          >
            ĐẶT NGAY
          </Button>{" "}
          {onClose && (
            <Button
              variant="secondary"
              size="lg"
              className="px-4 ms-2"
              onClick={onClose}
            >
              HỦY
            </Button>
          )}
        </div>
      </div>
    </Form>
  );
};

export default BookingForm;
