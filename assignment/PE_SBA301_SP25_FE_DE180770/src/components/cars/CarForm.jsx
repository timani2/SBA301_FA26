import React, { useState, useEffect } from "react";
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
import carService from "../../services/carService";

const CarForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [countries, setCountries] = useState([]);
  const [formData, setFormData] = useState({
    carName: "",
    unitsInStock: 5,
    unitPrice: 0,
    country: { countryID: "" },
  });
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const res = await carService.getAllCountries();
        setCountries(res.data);
      } catch (err) {
        console.error("Failed to load countries");
      }
    };
    fetchCountries();

    if (id) {
      const fetchCar = async () => {
        try {
          const res = await carService.getCarById(id);
          const data = res.data;
          setFormData({
            carName: data.carName,
            unitsInStock: data.unitsInStock,
            unitPrice: data.unitPrice,
            country: { countryID: data.countryID },
          });
        } catch (err) {
          setError("Cannot load car details.");
        }
      };
      fetchCar();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.carName.length <= 10)
      return setError("Car Name must be more than 10 characters.");
    if (formData.unitsInStock < 5 || formData.unitsInStock > 20)
      return setError("Units In Stock must be between 5 and 20.");

    try {
      const dataToSend = {
        ...formData,
        unitsInStock: parseInt(formData.unitsInStock),
        unitPrice: parseFloat(formData.unitPrice),
      };

      if (id) {
        await carService.updateCar(id, dataToSend);
      } else {
        await carService.createCar(dataToSend);
      }
      navigate("/cars");
    } catch (err) {
      setError(
        "Error saving car: " + (err.response?.data?.message || err.message),
      );
    }
  };

  // Tìm tên quốc gia để hiển thị trên Preview
  const selectedCountryName = countries.find(
    (c) => String(c.countryID) === String(formData.country.countryID),
  )?.countryName;

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

        {/* CỘT PHẢI: LIVE PREVIEW (KHỚP 100% VỚI HOME) */}
        <Col lg={5}>
          <div className="sticky-top" style={{ top: "100px" }}>
            <h5 className="text-muted mb-4 fw-bold">✨ Live Preview</h5>

            {/* Card này được thiết kế y hệt Card ở HomePage */}
            <Card
              className="shadow-sm border-0 hover-shadow transition mx-auto"
              style={{ maxWidth: "350px" }}
            >
              <Card.Img
                variant="top"
                src={`https://placehold.co/600x400?text=${formData.carName || "Preview Name"}`}
                alt="Preview"
                style={{ height: "200px", objectFit: "cover" }}
              />

              <Card.Body className="d-flex flex-column">
                <div className="d-flex justify-content-between align-items-start mb-2">
                  <Card.Title
                    className="fs-5 fw-bold mb-0 text-truncate"
                    style={{ maxWidth: "180px" }}
                  >
                    {formData.carName || "Vehicle Name"}
                  </Card.Title>
                  <Badge bg="info" pill>
                    {selectedCountryName || "Origin"}
                  </Badge>
                </div>

                <Card.Text className="text-muted small mb-3">
                  ID: {id || "New"} | Created: {new Date().toLocaleDateString()}
                </Card.Text>

                <div className="mt-auto">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <span className="text-muted small d-block">Price</span>
                      <span className="fs-5 fw-bold text-primary">
                        ${Number(formData.unitPrice).toLocaleString()}
                      </span>
                    </div>
                    <div className="text-end">
                      <span className="text-muted small d-block">
                        Inventory
                      </span>
                      <span
                        className={
                          formData.unitsInStock < 10
                            ? "text-danger fw-bold"
                            : "text-success fw-bold"
                        }
                      >
                        {formData.unitsInStock} units
                      </span>
                    </div>
                  </div>
                </div>
              </Card.Body>
            </Card>

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
