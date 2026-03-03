import React, { useState } from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";
import useLoginLogic from "../../hooks/useLoginLogic";

const LoginModal = ({ show, onHide }) => {
  const { credentials, setCredentials, error, handleLogin } = useLoginLogic(
    () => {
      onHide();
      window.location.reload();
    },
  );

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        {/* Task 3.1: Modal Title chuẩn */}
        <Modal.Title>Login to Cars Management System</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleLogin}>
          <Form.Group className="mb-3">
            <Form.Label>Member ID</Form.Label>
            <Form.Control
              type="text"
              required
              value={credentials.memberID}
              onChange={(e) =>
                setCredentials({ ...credentials, memberID: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              required
              value={credentials.password}
              onChange={(e) =>
                setCredentials({ ...credentials, password: e.target.value })
              }
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="w-100">
            Login
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default LoginModal;
