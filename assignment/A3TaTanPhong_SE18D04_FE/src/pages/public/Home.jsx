import { Row, Col, Card, Badge, Container } from "react-bootstrap";
import { useRooms } from "../../hooks/useRooms";
import { formatCurrency } from "../../utils/formatCurrency";
import LoadingSpinner from "../../components/ui/LoadingSpinner";

const Home = () => {
  const { rooms, loading } = useRooms();

  if (loading) return <LoadingSpinner />;

  return (
    <Container className="py-5">
      <div className="text-center mb-5">
        <h1 className="display-4 fw-bold">Chào mừng đến với Hotel Manager</h1>
        <p className="lead text-muted">
          Khám phá không gian nghỉ dưỡng sang trọng
        </p>
      </div>

      <h3 className="mb-4 border-bottom pb-2">Danh sách phòng</h3>

      <Row>
        {rooms && rooms.length > 0 ? (
          rooms.map((room) => (
            <Col key={room.roomId} md={6} lg={4} className="mb-4">
              <Card className="h-100 shadow-sm">
                <Card.Body className="d-flex flex-column">
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <Card.Title className="fs-4">
                      Phòng {room.roomNumber}
                    </Card.Title>
                    {/* Sử dụng biến status từ RoomResponse */}
                    <Badge
                      bg={room.status === "AVAILABLE" ? "success" : "danger"}
                    >
                      {room.status === "AVAILABLE" ? "Trống" : "Đã đặt"}
                    </Badge>
                  </div>

                  {/* Sử dụng biến roomTypeName từ RoomResponse */}
                  <Card.Subtitle className="mb-3 text-primary fw-bold">
                    {room.roomTypeName}
                  </Card.Subtitle>

                  <div className="border-top pt-3 mt-auto">
                    <div className="d-flex justify-content-between align-items-center">
                      <span className="text-muted small">Giá mỗi ngày:</span>
                      <span className="fs-5 fw-bold text-danger">
                        {/* Sử dụng biến price từ RoomResponse */}
                        {formatCurrency(room.price)}
                      </span>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <Col className="text-center py-5">
            <p className="text-muted">Hiện tại không có dữ liệu phòng.</p>
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default Home;
