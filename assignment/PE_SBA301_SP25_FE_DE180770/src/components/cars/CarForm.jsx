import React from "react";
import {
  Form,
  Button,
  Alert,
  Card,
  Row,
  Col,
  Badge,
  Container,
  InputGroup,
} from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import useCarFormLogic from "../../hooks/useCarFormLogic";
import CarCard from "./CarCard";

const CarForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    countries,
    formData,
    setFormData,
    error,
    handleSubmit,
    selectedCountryName,
  } = useCarFormLogic(id, navigate);

  return (
    <Container className="py-5">
      <Row className="mb-4">
        <Col>
          <h2 className="fw-bold">{id ? "Edit Car Details" : "Add New Car"}</h2>
          <hr className="w-25 text-primary" style={{ height: "3px" }} />
        </Col>
      </Row>

      <Row className="g-4">
        {/* CỘT TRÁI: FORM NHẬP LIỆU */}
        <Col lg={7}>
          <Card className="shadow-sm border-0 p-4">
            {error && (
              <Alert variant="danger" className="border-0 shadow-sm">
                {error}
              </Alert>
            )}

            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-4">
                <Form.Label className="fw-bold text-muted small text-uppercase">
                  Name
                </Form.Label>
                <Form.Control
                  size="lg"
                  type="text"
                  placeholder="Enter car name (e.g. Toyota Camry 2025)"
                  required
                  value={formData.carName}
                  onChange={(e) =>
                    setFormData({ ...formData, carName: e.target.value })
                  }
                />
              </Form.Group>

              <Row className="mb-4">
                <Col md={6}>
                  <Form.Label className="fw-bold text-muted small text-uppercase">
                    Stock
                  </Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Stock (5-20)"
                    required
                    value={formData.unitsInStock}
                    onChange={(e) =>
                      setFormData({ ...formData, unitsInStock: e.target.value })
                    }
                  />
                </Col>
                <Col md={6}>
                  <Form.Label className="fw-bold text-muted small text-uppercase">
                    Price
                  </Form.Label>
                  <InputGroup>
                    <InputGroup.Text className="bg-white border-end-0">
                      $
                    </InputGroup.Text>
                    <Form.Control
                      className="border-start-0"
                      type="number"
                      step="0.01"
                      required
                      value={formData.unitPrice}
                      onChange={(e) =>
                        setFormData({ ...formData, unitPrice: e.target.value })
                      }
                    />
                  </InputGroup>
                </Col>
              </Row>

              <Form.Group className="mb-5">
                <Form.Label className="fw-bold text-muted small text-uppercase">
                  Country of Origin
                </Form.Label>
                <Form.Select
                  required
                  value={formData.country.countryID}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      country: { countryID: e.target.value },
                    })
                  }
                >
                  <option value="">-- Choose Country --</option>
                  {countries.map((c) => (
                    <option key={c.countryID} value={c.countryID}>
                      {c.countryName}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>

              <div className="d-flex gap-3">
                <Button
                  type="submit"
                  variant="primary"
                  className="px-5 py-2 fw-bold flex-grow-1 shadow-sm"
                >
                  {id ? "Save Changes" : "Create Vehicle"}
                </Button>
                <Button
                  variant="outline-secondary"
                  onClick={() => navigate("/cars")}
                  className="px-4 py-2"
                >
                  Back to Management
                </Button>
              </div>
            </Form>
          </Card>
        </Col>

        <Col lg={5}>
          <div className="sticky-top" style={{ top: "100px" }}>
            <h5 className="text-muted mb-4 fw-bold">✨ Live Preview</h5>

            {/* Sử dụng CarCard để tái dùng UI giữa Home và Live Preview */}
            {(() => {
              const previewCar = {
                carName: formData.carName || "Vehicle Name",
                countryName: selectedCountryName || "Origin",
                carID: id || "New",
                createdAt: new Date(),
                unitPrice: formData.unitPrice,
                unitsInStock: formData.unitsInStock,
              };
              return <CarCard car={previewCar} />;
            })()}

            <Alert
              variant="light"
              className="mt-4 border text-center small text-muted"
            >
              "The preview above shows how this car will appear to customers on
              the Home Page."
            </Alert>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default CarForm;
