import React, { useEffect } from "react";
import { Container, Row, Col, Card, Badge, Button } from "react-bootstrap";
import { useRooms } from "../../hooks/useRooms";
import { formatCurrency } from "../../utils/formatCurrency";
import LoadingSpinner from "../../components/ui/LoadingSpinner";

const Home = () => {
  // Lấy dữ liệu và hàm fetch từ hook
  const { rooms, loading, fetchRooms } = useRooms();

  // Tự động gọi API lấy danh sách phòng khi trang vừa load xong
  useEffect(() => {
    fetchRooms();
  }, [fetchRooms]);

  if (loading) return <LoadingSpinner text="Đang tải danh sách phòng..." />;

  return (
    <Container className="py-5">
      <h2 className="text-center mb-5 fw-bold">Danh Sách Phòng Khách Sạn</h2>
      <Row xs={1} md={2} lg={3} className="g-4">
        {rooms && rooms.length > 0 ? (
          rooms.map((room) => (
            <Col key={room.roomId}>
              <Card className="h-100 shadow-sm transition">
                <Card.Img
                  variant="top"
                  src={`https://placehold.co/600x400?text=Phòng+${room.roomNumber}`}
                />
                <Card.Body>
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <Card.Title className="mb-0 fs-4 fw-bold">
                      Phòng {room.roomNumber}
                    </Card.Title>
                    <Badge bg={room.roomStatus === 1 ? "success" : "danger"}>
                      {room.roomStatus === 1 ? "Khả dụng" : "Đang bảo trì"}
                    </Badge>
                  </div>
                  <Card.Text className="text-muted mb-3">
                    {room.roomDetailDescription}
                  </Card.Text>
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <span>
                      <strong>Sức chứa:</strong> {room.roomMaxCapacity} người
                    </span>
                  </div>
                  <h5 className="text-primary fw-bold mb-4">
                    {formatCurrency(room.roomPricePerDay)} / ngày
                  </h5>
                  <Button
                    variant="outline-primary"
                    className="w-100"
                    disabled={room.roomStatus === 0}
                  >
                    Đặt Phòng Ngay
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <div className="text-center w-100 mt-4 text-muted">
            Chưa có dữ liệu phòng nào trong hệ thống.
          </div>
        )}
      </Row>
    </Container>
  );
};

export default Home;
