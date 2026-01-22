// src/page/Login.jsx
import {
  Form,
  Button,
  Card,
  Container,
  Row,
  Col,
  Alert,
  Spinner,
} from "react-bootstrap";
import { useLogin } from "../hooks/useLogin";

const Login = () => {
  const {
    formState,
    loading,
    error,
    handleChange,
    handleSubmit,
    handleCancel,
    clearError,
  } = useLogin();

  return (
    <div
      className="d-flex justify-content-center align-items-center min-vh-100"
      style={{
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      }}
    >
      <Container>
        <Row className="justify-content-center">
          <Col md={6} lg={5}>
            <Card className="shadow-lg border-0 rounded-4">
              <Card.Header
                className="bg-primary text-white text-center py-4"
                style={{
                  background:
                    "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
                }}
              >
                <h3 className="mb-0 fw-bold">Login with AuthContext</h3>
              </Card.Header>
              <Card.Body className="p-4">
                {error && (
                  <Alert variant="danger" onClose={clearError} dismissible>
                    {error}
                  </Alert>
                )}
                <Form onSubmit={handleSubmit} noValidate>
                  <Form.Group className="mb-3" controlId="identifier">
                    <Form.Label>Username or Email</Form.Label>
                    <Form.Control
                      type="text"
                      name="identifier"
                      value={formState.identifier}
                      onChange={handleChange}
                      isInvalid={!!formState.errors.identifier}
                      placeholder="Enter username or email"
                      disabled={loading}
                    />
                    <Form.Control.Feedback type="invalid">
                      {formState.errors.identifier}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      name="password"
                      value={formState.password}
                      onChange={handleChange}
                      isInvalid={!!formState.errors.password}
                      placeholder="Enter password"
                      disabled={loading}
                    />
                    <Form.Control.Feedback type="invalid">
                      {formState.errors.password}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <div className="d-flex gap-2">
                    <Button
                      variant="primary"
                      type="submit"
                      className="flex-grow-1"
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <Spinner size="sm" className="me-2" />
                          Logging in...
                        </>
                      ) : (
                        "Login"
                      )}
                    </Button>
                    <Button
                      variant="secondary"
                      type="button"
                      className="flex-grow-1"
                      onClick={handleCancel}
                      disabled={loading}
                    >
                      Cancel
                    </Button>
                  </div>

                  <div className="mt-3 text-center">
                    <small className="text-muted">
                      Admin: <strong>admin</strong> / <strong>123456</strong>
                      <br />
                      User: <strong>user1</strong> / <strong>123456</strong>{" "}
                      (access denied)
                      <br />
                      Locked: <strong>user2</strong> / <strong>123456</strong>{" "}
                      (account locked)
                    </small>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;
