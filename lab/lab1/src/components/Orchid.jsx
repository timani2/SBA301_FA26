// src/components/Orchid.jsx
import { useState } from "react";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
// 1. Import component vừa tạo
import ConfirmModal from "./ConfirmModal";

function Orchid({ orchidList }) {
  const [show, setShow] = useState(false);
  const [selectedOrchid, setSelectedOrchid] = useState(null);

  const handleClose = () => setShow(false);

  const handleShow = (orchid) => {
    setSelectedOrchid(orchid);
    setShow(true);
  };

  const handleConfirm = () => {
    console.log("Đã xác nhận: ", selectedOrchid?.orchidName);
    setShow(false);
  };

  return (
    <div>
      <Container className="py-5">
        <Row>
          {orchidList.map((orchid) => (
            <Col md={3} key={orchid.id} className="mb-4 d-flex">
              <Card className="h-100 w-100 position-relative shadow-sm">
                <div className="position-relative">
                  <Card.Img
                    variant="top"
                    src={orchid.image}
                    style={{ height: "250px", objectFit: "cover" }}
                  />
                  {orchid.isSpecial && (
                    <div
                      className="position-absolute top-0 end-0 bg-danger text-white px-3 py-1"
                      style={{ borderBottomLeftRadius: "10px" }}
                    >
                      Special
                    </div>
                  )}
                </div>

                <Card.Body className="d-flex flex-column">
                  <Card.Title className="text-center">
                    {orchid.orchidName}
                  </Card.Title>
                  <Card.Text className="text-center">
                    <strong>Category:</strong> {orchid.category}
                  </Card.Text>

                  <Button
                    variant="primary"
                    onClick={() => handleShow(orchid)}
                    className="mt-auto w-100"
                  >
                    Detail
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        {selectedOrchid && (
          <ConfirmModal
            show={show}
            handleClose={handleClose}
            title={selectedOrchid.orchidName}
            onConfirm={handleConfirm}
            body={
              <div>
                <img
                  src={selectedOrchid.image}
                  alt={selectedOrchid.orchidName}
                  className="img-fluid mb-3 rounded"
                  style={{ width: "100%" }}
                />
                <p>
                  <strong>Description:</strong> {selectedOrchid.description}
                </p>
                <p>
                  <strong>Category:</strong> {selectedOrchid.category}
                </p>
                {selectedOrchid.isSpecial && (
                  <p className="text-danger fw-bold">★ Special Item</p>
                )}
              </div>
            }
          />
        )}
      </Container>
    </div>
  );
}

export default Orchid;
