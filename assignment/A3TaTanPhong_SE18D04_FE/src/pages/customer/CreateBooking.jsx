import React, { useEffect, useState, useContext } from "react";
import { Container, Form, Button, Table } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { useRooms } from "../../hooks/useRooms";
import { useCustomers } from "../../hooks/useCustomers";
import { useBookings } from "../../hooks/useBookings";
import { AuthContext } from "../../contexts/AuthContext";
import LoadingSpinner from "../../components/ui/LoadingSpinner";
import { formatCurrency } from "../../utils/formatCurrency";

const CreateBooking = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { rooms, loading: loadingRooms, fetchRooms } = useRooms();
  const {
    customers,
    loading: loadingCustomers,
    fetchAllCustomers,
  } = useCustomers();
  const { createBooking, loading: loadingBooking } = useBookings();
  const { user } = useContext(AuthContext);

  const [selectedRoomIds, setSelectedRoomIds] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
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

  // Khi link có tham số room, tự động check
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const roomParam = params.get("room");
    if (roomParam) {
      const id = parseInt(roomParam, 10);
      if (!isNaN(id)) setSelectedRoomIds([id]);
    }
  }, [location.search]);

  const handleToggleRoom = (roomId) => {
    setSelectedRoomIds((prev) =>
      prev.includes(roomId)
        ? prev.filter((id) => id !== roomId)
        : [...prev, roomId],
    );
  };

  const calculateTotal = () => {
    if (!startDate || !endDate) return 0;
    const sd = new Date(startDate);
    const ed = new Date(endDate);
    const days = Math.ceil((ed - sd) / (1000 * 60 * 60 * 24));
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

    const details = selectedRoomIds.map((roomId) => ({
      roomId,
      startDate,
      endDate,
    }));

    const bookingData = {
      totalPrice: calculateTotal(),
      bookingStatus: 1,
      customer: { customerId: myId },
      bookingDetails: details,
    };

    const success = await createBooking(bookingData);
    if (success) {
      navigate("/customer/history");
    }
  };

  if (loadingRooms || loadingCustomers || loadingBooking) {
    return <LoadingSpinner text="Đang chuẩn bị dữ liệu..." />;
  }

  return (
    <Container className="py-4">
      <h3 className="fw-bold mb-4">Đặt phòng trực tuyến</h3>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="startDate">
          <Form.Label>Ngày bắt đầu</Form.Label>
          <Form.Control
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
            min={new Date().toISOString().split("T")[0]}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="endDate">
          <Form.Label>Ngày kết thúc</Form.Label>
          <Form.Control
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
            min={startDate || new Date().toISOString().split("T")[0]}
          />
        </Form.Group>
        <Table
          striped
          bordered
          hover
          responsive
          className="align-middle shadow-sm"
        >
          <thead className="table-dark">
            <tr>
              <th></th>
              <th>ID</th>
              <th>Số phòng</th>
              <th>Giá/ngày</th>
              <th>Trạng thái</th>
            </tr>
          </thead>
          <tbody>
            {rooms.map((r) => (
              <tr key={r.roomId}>
                <td className="text-center">
                  <Form.Check
                    type="checkbox"
                    checked={selectedRoomIds.includes(r.roomId)}
                    onChange={() => handleToggleRoom(r.roomId)}
                    disabled={r.roomStatus !== 1}
                  />
                </td>
                <td>{r.roomId}</td>
                <td>{r.roomNumber}</td>
                <td>{formatCurrency(r.roomPricePerDay)}</td>
                <td>{r.roomStatus === 1 ? "Khả dụng" : "Không"}</td>
              </tr>
            ))}
          </tbody>
        </Table>
        <div className="mb-3">
          <strong>Tổng tiền dự tính: </strong>
          {formatCurrency(calculateTotal())}
        </div>
        <Button
          type="submit"
          variant="success"
          disabled={selectedRoomIds.length === 0}
        >
          Đặt ngay
        </Button>
      </Form>
    </Container>
  );
};

export default CreateBooking;
