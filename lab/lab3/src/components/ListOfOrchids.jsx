// src/components/ListOfOrchids.jsx
import { Link } from "react-router-dom"; // <--- Import Link
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";

function ListOfOrchids({ orchidList }) {
  return (
    <>
      <Row>
        {orchidList.length > 0
          ? orchidList.map((orchid) => (
              <Col md={3} key={orchid.id} className="mb-4 d-flex">
                <Card className="h-100 w-100 position-relative shadow-sm">
                  <Card.Img
                    variant="top"
                    src={orchid.image}
                    style={{ height: "250px", objectFit: "cover" }}
                  />
                  <Card.Body>
                    <Card.Title>{orchid.orchidName}</Card.Title>
                    <span className="text-danger fw-bold">${orchid.price}</span>
                    <div className="d-grid mt-3">
                      {/* Sử dụng Link để chuyển sang trang detail */}
                      <Link
                        to={`/detail/${orchid.id}`}
                        className="btn btn-primary"
                      >
                        Detail
                      </Link>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))
          : null}
      </Row>
    </>
  );
}

export default ListOfOrchids;
