import { useState } from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import ConfirmModal from "../components/ConfirmModal"; // Import modal đã có sẵn

function Contact() {
  const [validated, setValidated] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    agree: false,
  });

  const [showModal, setShowModal] = useState(false);

  const handleChange = (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setFormData({
      ...formData,
      [e.target.name]: value,
    });
  };

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      setShowModal(true);
    }
    setValidated(true);
  };

  const handleConfirm = () => {
    console.log("Submitting data:", formData);
    alert("Gửi thông tin thành công!");
    setShowModal(false);
    setFormData({
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      agree: false,
    });
    setValidated(false);
  };

  const modalBody = (
    <div>
      <p>Vui lòng kiểm tra lại thông tin trước khi gửi:</p>
      <ul>
        <li>
          <strong>Họ và tên:</strong> {formData.lastName} {formData.firstName}
        </li>
        <li>
          <strong>Số điện thoại:</strong> {formData.phone}
        </li>
        <li>
          <strong>Email:</strong> {formData.email}
        </li>
      </ul>
    </div>
  );

  return (
    <Container className="py-5">
      {/* Row và Col giúp căn giữa Card trên màn hình lớn */}
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          {/* Card tạo ra cái khung có viền và đổ bóng (shadow) */}
          <Card className="shadow-lg border-0 rounded-3">
            {/* Header của khung, thêm màu nền xanh (bg-primary) và chữ trắng */}
            <Card.Header className="bg-primary text-white text-center py-3 rounded-top-3">
              <h3 className="mb-0 fw-bold">Liên Hệ Với Chúng Tôi</h3>
            </Card.Header>

            <Card.Body className="p-4">
              <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Row className="mb-3">
                  <Form.Group
                    as={Col}
                    sm="6"
                    controlId="validationCustom01"
                    className="mb-3 mb-sm-0"
                  >
                    <Form.Label className="fw-semibold">First Name</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      placeholder="Tên"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                    />

                    <Form.Control.Feedback type="invalid">
                      Vui lòng nhập tên.
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group as={Col} sm="6" controlId="validationCustom02">
                    <Form.Label className="fw-semibold">Last Name</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      placeholder="Họ"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                    />

                    <Form.Control.Feedback type="invalid">
                      Vui lòng nhập họ.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>

                <Form.Group className="mb-3" controlId="validationCustomPhone">
                  <Form.Label className="fw-semibold">Phone Number</Form.Label>
                  <Form.Control
                    required
                    type="tel"
                    placeholder="Ví dụ: 0901234567"
                    name="phone"
                    pattern="[0-9]{10}"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                  <Form.Control.Feedback type="invalid">
                    Số điện thoại phải gồm 10 chữ số.
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="validationCustomEmail">
                  <Form.Label className="fw-semibold">Email Address</Form.Label>
                  <Form.Control
                    required
                    type="email"
                    placeholder="name@example.com"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  <Form.Control.Feedback type="invalid">
                    Email không hợp lệ.
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Check
                    required
                    id="agreeCheckbox"
                    label="Tôi đồng ý với các điều khoản và điều kiện"
                    feedback="Bạn cần đồng ý để tiếp tục."
                    feedbackType="invalid"
                    name="agree"
                    checked={formData.agree}
                    onChange={handleChange}
                  />
                </Form.Group>

                <div className="d-grid">
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    className="fw-bold"
                  >
                    Gửi Liên Hệ
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <ConfirmModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        title="Xác nhận gửi thông tin"
        body={modalBody}
        onConfirm={handleConfirm}
      />
    </Container>
  );
}

export default Contact;
