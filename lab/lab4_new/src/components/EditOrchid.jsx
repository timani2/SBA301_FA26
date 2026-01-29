import React from "react";
import { Container, Form, Button, Card, Row, Col } from "react-bootstrap";
import { useParams } from "react-router";
import { useEditOrchid } from "../hooks/useEditOrchid";

export default function EditOrchid() {
  const { id } = useParams();
  const { register, handleSubmit, onUpdate, navigate } = useEditOrchid(id);

  return (
    <Container>
      <Row className="justify-content-center mt-5">
        <Col md={6}>
          <Card>
            <Card.Header>
              <h5>Chỉnh sửa Orchid ID: {id}</h5>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit(onUpdate)}>
                <Form.Group className="mb-3">
                  <Form.Label>Tên Orchid</Form.Label>
                  <Form.Control {...register("orchidName")} required />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Đường dẫn ảnh</Form.Label>
                  <Form.Control {...register("image")} required />
                </Form.Group>
                <Form.Check
                  type="switch"
                  label="Tự nhiên"
                  {...register("isNatural")}
                  className="mb-3"
                />
                <Button type="submit" variant="success" className="me-2">
                  Lưu lại
                </Button>
                <Button variant="secondary" onClick={() => navigate("/")}>
                  Hủy
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
