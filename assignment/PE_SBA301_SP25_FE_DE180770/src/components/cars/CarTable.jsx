import React from "react";
// THÊM Row, Col vào import ở đây
import { Table, Button, Modal, Form, Alert, Row, Col } from "react-bootstrap";
import useCarTableLogic from "../../hooks/useCarTableLogic";

const CarTable = () => {
  const {
    cars,
    countries,
    userRole,
    showEditModal,
    editCarData,
    setEditCarData,
    editError,
    handleEditClick,
    handleEditSubmit,
    showDeleteModal,
    deleteCarName,
    deleteError,
    handleDeleteClick,
    handleDeleteConfirm,
    closeEditModal,
    closeDeleteModal,
  } = useCarTableLogic();

  return (
    <>
      <Table striped bordered hover responsive className="mt-3 shadow-sm">
        <thead className="table-dark text-center">
          <tr>
            <th>ID</th>
            <th>Car Name</th>
            <th>Stock</th>
            <th>Price</th>
            <th>Country</th>
            <th>Created At</th>
            {/* Cách viết an toàn để tránh lỗi khoảng trắng */}
            {userRole === "1" ? <th>Actions</th> : null}
          </tr>
        </thead>
        <tbody>
          {cars.map((car) => (
            <tr key={car.carID}>
              <td className="text-center">{car.carID}</td>
              <td>{car.carName}</td>
              <td className="text-center">{car.unitsInStock}</td>
              <td className="text-end">
                ${Number(car.unitPrice).toLocaleString()}
              </td>
              <td className="text-center">{car.countryName}</td>
              <td className="text-center">
                {new Date(car.createdAt).toLocaleDateString()}
              </td>
              {/* SỬA LỖI QUAN TRỌNG: Không để khoảng trắng giữa <tr> và <td> */}
              {userRole === "1" ? (
                <td className="text-center">
                  <Button
                    variant="warning"
                    size="sm"
                    className="me-2"
                    onClick={() => handleEditClick(car)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDeleteClick(car)}
                  >
                    Delete
                  </Button>
                </td>
              ) : null}
            </tr>
          ))}
        </tbody>
      </Table>

      {/* MODAL EDIT - Đã có đủ Row/Col nên cần import ở trên */}
      <Modal show={showEditModal} onHide={closeEditModal} centered size="lg">
        <Modal.Header closeButton className="bg-primary text-white">
          <Modal.Title>Update Vehicle Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {editError && <Alert variant="danger">{editError}</Alert>}
          <Form>
            <Form.Group className="mb-3">
              <Form.Label className="fw-bold">Car Name</Form.Label>
              <Form.Control
                type="text"
                value={editCarData.carName}
                onChange={(e) =>
                  setEditCarData({ ...editCarData, carName: e.target.value })
                }
              />
            </Form.Group>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-bold">Stock</Form.Label>
                  <Form.Control
                    type="number"
                    value={editCarData.unitsInStock}
                    onChange={(e) =>
                      setEditCarData({
                        ...editCarData,
                        unitsInStock: e.target.value,
                      })
                    }
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-bold">Price</Form.Label>
                  <Form.Control
                    type="number"
                    value={editCarData.unitPrice}
                    onChange={(e) =>
                      setEditCarData({
                        ...editCarData,
                        unitPrice: e.target.value,
                      })
                    }
                  />
                </Form.Group>
              </Col>
            </Row>
            <Form.Group className="mb-3">
              <Form.Label className="fw-bold">Country</Form.Label>
              <Form.Select
                value={editCarData.country.countryID}
                onChange={(e) =>
                  setEditCarData({
                    ...editCarData,
                    country: { countryID: e.target.value },
                  })
                }
              >
                <option value="">-- Select Country --</option>
                {countries.map((c) => (
                  <option key={c.countryID} value={c.countryID}>
                    {c.countryName}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeEditModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleEditSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      {/* MODAL DELETE */}
      <Modal show={showDeleteModal} onHide={closeDeleteModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <p className="fs-5">
            Are you sure you want to delete car: <br />
            <strong>{deleteCarName}</strong>?
          </p>
          {deleteError && <Alert variant="danger">{deleteError}</Alert>}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeDeleteModal}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDeleteConfirm}>
            Confirm Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CarTable;
