import { useState, useMemo } from "react";
import { Form, Button, Row, Col, Card, Table } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";
import { formatCurrency } from "../../utils/formatCurrency";

const formatDateForApi = (date) => {
  if (!date) return "";
  const d = new Date(date);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
};

const formatDisplayDate = (date) => {
  if (!date) return "";
  const d = new Date(date);
  return d.toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

const getNights = (checkIn, checkOut) => {
  if (!checkIn || !checkOut || checkOut <= checkIn) return 0;
  const diff = checkOut.getTime() - checkIn.getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
};

const BookingForm = ({ selectedRooms, onSubmit }) => {
  const today = new Date();
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);

  const handleCheckInChange = (date) => {
    setCheckInDate(date);
    if (checkOutDate && date && checkOutDate <= date) setCheckOutDate(null);
  };

  const nights = useMemo(
    () => getNights(checkInDate, checkOutDate),
    [checkInDate, checkOutDate],
  );

  const { totalAmount, breakdown } = useMemo(() => {
    const pricePerNight = (room) => room.price ?? room.roomPricePerDay ?? 0;
    const items = selectedRooms.map((r) => ({
      room: r,
      pricePerNight: pricePerNight(r),
      subtotal: nights * pricePerNight(r),
    }));
    const total = items.reduce((sum, i) => sum + i.subtotal, 0);
    return { totalAmount: total, breakdown: items };
  }, [selectedRooms, nights]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (selectedRooms.length === 0) {
      toast.warning("Vui lòng chọn ít nhất một phòng!");
      return;
    }

    if (!checkInDate || !checkOutDate) {
      toast.warning("Vui lòng chọn ngày đến và ngày đi!");
      return;
    }

    onSubmit({
      checkInDate: formatDateForApi(checkInDate),
      checkOutDate: formatDateForApi(checkOutDate),
      roomIds: selectedRooms.map((room) => room.roomId ?? room.id),
    });
  };

  const canShowSummary =
    selectedRooms.length > 0 && checkInDate && checkOutDate && nights > 0;

  return (
    <Form
      onSubmit={handleSubmit}
      className="p-3 border rounded bg-light shadow-sm"
    >
      <h5 className="mb-3">Thông tin đặt phòng</h5>
      <Row>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Ngày đến</Form.Label>
            <DatePicker
              selected={checkInDate}
              onChange={handleCheckInChange}
              minDate={today}
              dateFormat="dd/MM/yyyy"
              placeholderText="Chọn ngày đến"
              className="form-control w-100"
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Ngày đi</Form.Label>
            <DatePicker
              selected={checkOutDate}
              onChange={setCheckOutDate}
              minDate={checkInDate || today}
              dateFormat="dd/MM/yyyy"
              placeholderText="Chọn ngày đi"
              className="form-control w-100"
            />
          </Form.Group>
        </Col>
      </Row>
      <div className="mb-3">
        <strong>Phòng đã chọn:</strong>{" "}
        {selectedRooms.length > 0
          ? selectedRooms.map((r) => r.roomNumber).join(", ")
          : "Chưa chọn phòng nào"}
      </div>

      {canShowSummary && (
        <Card className="mb-3 border-primary">
          <Card.Header className="bg-primary bg-opacity-10 fw-bold">
            Tóm tắt đặt phòng
          </Card.Header>
          <Card.Body>
            <p className="mb-2">
              <strong>Thời gian:</strong> {nights} đêm (từ{" "}
              {formatDisplayDate(checkInDate)} đến{" "}
              {formatDisplayDate(checkOutDate)})
            </p>
            <Table size="sm" className="mb-0">
              <thead>
                <tr>
                  <th>Phòng</th>
                  <th className="text-end">Đơn giá/đêm</th>
                  <th className="text-end">Tạm tính</th>
                </tr>
              </thead>
              <tbody>
                {breakdown.map((item) => (
                  <tr key={item.room.roomId ?? item.room.id}>
                    <td>Phòng {item.room.roomNumber}</td>
                    <td className="text-end">
                      {formatCurrency(item.pricePerNight)}
                    </td>
                    <td className="text-end fw-bold">
                      {formatCurrency(item.pricePerNight)} × {nights} đêm ={" "}
                      {formatCurrency(item.subtotal)}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="table-primary">
                  <td colSpan="2" className="fw-bold">
                    Tổng cộng
                  </td>
                  <td className="text-end fw-bold fs-5 text-danger">
                    {formatCurrency(totalAmount)}
                  </td>
                </tr>
              </tfoot>
            </Table>
          </Card.Body>
        </Card>
      )}

      <Button
        variant="primary"
        type="submit"
        className="w-100"
        disabled={
          selectedRooms.length === 0 ||
          !checkInDate ||
          !checkOutDate ||
          nights < 1
        }
      >
        Xác nhận đặt phòng{" "}
        {canShowSummary && `· Tổng ${formatCurrency(totalAmount)}`}
      </Button>
    </Form>
  );
};

export default BookingForm;
