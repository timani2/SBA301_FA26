import { useState } from "react";
import { Row, Col, Card, Button, ListGroup } from "react-bootstrap";
import { useRooms } from "../../hooks/useRooms";
import { useBookings } from "../../hooks/useBookings";
import BookingForm from "../../components/customer/BookingForm";
import { formatCurrency } from "../../utils/formatCurrency";

const CreateBooking = () => {
  const { rooms, loading: roomsLoading } = useRooms();
  const { createBooking, loading: bookingLoading } = useBookings();
  const [selectedRooms, setSelectedRooms] = useState([]);

  const toggleRoomSelection = (room) => {
    if (selectedRooms.find((r) => r.id === room.id)) {
      setSelectedRooms(selectedRooms.filter((r) => r.id !== room.id));
    } else {
      setSelectedRooms([...selectedRooms, room]);
    }
  };

  const handleBookingSubmit = async (bookingData) => {
    // bookingData đã bao gồm arrivalDate, departureDate và roomIds từ BookingForm
    await createBooking(bookingData);
    setSelectedRooms([]); // Reset sau khi đặt thành công
  };

  if (roomsLoading) return <div>Đang tải danh sách phòng...</div>;

  return (
    <div>
      <h2 className="mb-4">Đặt phòng khách sạn</h2>
      <Row>
        <Col lg={8}>
          <Row>
            {rooms
              .filter((r) => r.roomStatus === "ACTIVE")
              .map((room) => (
                <Col md={6} key={room.id} className="mb-3">
                  <Card
                    className={
                      selectedRooms.find((r) => r.id === room.id)
                        ? "border-primary shadow"
                        : ""
                    }
                  >
                    <Card.Body>
                      <Card.Title>Phòng {room.roomNumber}</Card.Title>
                      <Card.Text className="text-muted small">
                        {room.roomDescription}
                      </Card.Text>
                      <div className="d-flex justify-content-between align-items-center">
                        <span className="fw-bold text-danger">
                          {formatCurrency(room.roomPricePerDay)}/ngày
                        </span>
                        <Button
                          variant={
                            selectedRooms.find((r) => r.id === room.id)
                              ? "danger"
                              : "outline-primary"
                          }
                          size="sm"
                          onClick={() => toggleRoomSelection(room)}
                        >
                          {selectedRooms.find((r) => r.id === room.id)
                            ? "Bỏ chọn"
                            : "Chọn phòng"}
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
          </Row>
        </Col>
        <Col lg={4}>
          <BookingForm
            selectedRooms={selectedRooms}
            onSubmit={handleBookingSubmit}
          />
        </Col>
      </Row>
    </div>
  );
};

export default CreateBooking;
