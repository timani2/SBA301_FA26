// src/components/ListOfOrchids.jsx
import { Link } from "react-router-dom";
import { Col, Row, Card, Badge } from "react-bootstrap";

function ListOfOrchids({ orchidList }) {
  return (
    <Row>
      {orchidList.map((orchid) => (
        <Col md={3} key={orchid.orchidID} className="mb-4 d-flex">
          {/* position-relative giúp các badge căn chỉnh tuyệt đối bên trong card */}
          <Card className="h-100 w-100 position-relative shadow-sm border-0 overflow-hidden">
            {/* Phần nhãn hiển thị ở góc trên bên trái ảnh */}
            <div
              className="position-absolute"
              style={{
                top: "10px",
                left: "10px",
                zIndex: 5,
                display: "flex",
                flexDirection: "column",
                gap: "5px",
              }}
            >
              {orchid.isAttractive && (
                <Badge bg="warning" text="dark" className="shadow-sm p-2">
                  ✨ Đặc biệt
                </Badge>
              )}
              {orchid.isNatural && (
                <Badge bg="success" className="shadow-sm p-2">
                  🌿 Tự nhiên
                </Badge>
              )}
            </div>

            <Card.Img
              variant="top"
              src={orchid.orchidURL}
              style={{ height: "250px", objectFit: "cover" }}
              alt={orchid.orchidName}
            />
            <Card.Body className="d-flex flex-column">
              <Card.Title className="text-truncate" title={orchid.orchidName}>
                {orchid.orchidName}
              </Card.Title>
              <div className="mt-auto">
                <p className="text-danger fw-bold mb-2">Giá: ${orchid.price}</p>
                <div className="d-grid">
                  <Link
                    to={`/detail/${orchid.orchidID}`}
                    className="btn btn-primary btn-sm fw-bold"
                  >
                    Chi tiết
                  </Link>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
}

export default ListOfOrchids;
