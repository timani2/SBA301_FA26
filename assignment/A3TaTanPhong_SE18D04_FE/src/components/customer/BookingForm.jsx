import { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { toast } from "react-toastify";

const BookingForm = ({ selectedRooms, onSubmit }) => {
  const [dates, setDates] = useState({
    arrivalDate: "",
    departureDate: "",
  });

  const handleChange = (e) => {
    setDates({ ...dates, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (selectedRooms.length === 0) {
      toast.warning("Vui lòng chọn ít nhất một phòng!");
      return;
    }

    if (!dates.arrivalDate || !dates.departureDate) {
      toast.warning("Vui lòng chọn ngày đến và ngày đi!");
      return;
    }

    // Gửi dữ liệu theo cấu trúc BookingRequest của Backend
    onSubmit({
      arrivalDate: dates.arrivalDate,
      departureDate: dates.departureDate,
      roomIds: selectedRooms.map((room) => room.id),
    });
  };

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
            <Form.Control
              type="date"
              name="arrivalDate"
              value={dates.arrivalDate}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Ngày đi</Form.Label>
            <Form.Control
              type="date"
              name="departureDate"
              value={dates.departureDate}
              onChange={handleChange}
              required
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
      <Button
        variant="primary"
        type="submit"
        className="w-100"
        disabled={selectedRooms.length === 0}
      >
        Xác nhận đặt phòng
      </Button>
    </Form>
  );
};

export default BookingForm;
