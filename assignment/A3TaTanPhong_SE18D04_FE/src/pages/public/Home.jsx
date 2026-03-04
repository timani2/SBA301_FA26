import { Row, Col, Card, Badge, Container } from "react-bootstrap";
import { useRooms } from "../../hooks/useRooms";
import { formatCurrency } from "../../utils/formatCurrency";
import LoadingSpinner from "../../components/ui/LoadingSpinner";

const Home = () => {
  // Lấy rooms và loading từ Hook.
  // Hook useRooms đã tự động gọi API tải dữ liệu bên trong useEffect của nó.
  const { rooms, loading } = useRooms();

  if (loading) return <LoadingSpinner />;
  console.log("Dữ liệu phòng:", rooms);
  return (
    <Container>
      <div className="text-center mb-5">
        <h1 className="display-4 fw-bold">Chào mừng đến với Hotel Manager</h1>
        <p className="lead text-muted">
          Khám phá không gian nghỉ dưỡng sang trọng và tiện nghi
        </p>
      </div>

      <h3 className="mb-4 border-bottom pb-2">Danh sách phòng trống</h3>

      <Row>
        {rooms && rooms.length > 0 ? (
          rooms
            .filter((room) => room.roomStatus === "ACTIVE") // Chỉ hiển thị phòng đang hoạt động
            .map((room) => (
              <Col key={room.id} md={6} lg={4} className="mb-4">
                <Card className="h-100 shadow-sm hover-shadow transition">
                  <Card.Body className="d-flex flex-column">
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <Card.Title className="fs-4">
                        Phòng {room.roomNumber}
                      </Card.Title>
                      <Badge bg="success">Khả dụng</Badge>
                    </div>

                    <Card.Subtitle className="mb-3 text-primary fw-bold">
                      {room.roomType?.roomTypeName || "N/A"}
                    </Card.Subtitle>

                    <Card.Text className="text-muted small mb-3">
                      {room.roomDescription}
                    </Card.Text>

                    <div className="border-top pt-3 mt-auto">
                      <Row className="text-center small mb-3">
                        <Col xs={6} className="border-end">
                          <div className="text-muted">Người lớn</div>
                          <div className="fw-bold">{room.roomMaxAdult}</div>
                        </Col>
                        <Col xs={6}>
                          <div className="text-muted">Trẻ em</div>
                          <div className="fw-bold">{room.roomMaxChildren}</div>
                        </Col>
                      </Row>

                      <div className="d-flex justify-content-between align-items-center">
                        <span className="text-muted small">Giá mỗi ngày:</span>
                        <span className="fs-5 fw-bold text-danger">
                          {formatCurrency(room.roomPricePerDay)}
                        </span>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))
        ) : (
          <Col className="text-center py-5">
            <p className="text-muted">Hiện tại không có phòng nào khả dụng.</p>
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default Home;
