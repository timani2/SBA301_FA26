import React, { useEffect, useState } from "react";
// THÊM Row, Col vào import ở đây
import { Table, Button, Modal, Form, Alert, Row, Col } from "react-bootstrap";
import carService from "../../services/carService";
import authService from "../../services/authService";

const CarTable = () => {
  const [cars, setCars] = useState([]);
  const [countries, setCountries] = useState([]);
  const userRole = authService.getCurrentUserRole();

  const [showEditModal, setShowEditModal] = useState(false);
  const [editCarData, setEditCarData] = useState({
    carID: null,
    carName: "",
    unitsInStock: 5,
    unitPrice: 0,
    country: { countryID: "" },
  });
  const [editError, setEditError] = useState("");

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteCarID, setDeleteCarID] = useState(null);
  const [deleteCarName, setDeleteCarName] = useState("");
  const [deleteError, setDeleteError] = useState("");

  useEffect(() => {
    fetchCars();
    fetchCountries();
  }, []);

  const fetchCars = async () => {
    try {
      const res = await carService.getAllCars();
      setCars(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchCountries = async () => {
    try {
      const res = await carService.getAllCountries();
      const normalized = (res.data || []).map((c) => ({
        ...c,
        countryID: c.countryID != null ? String(c.countryID) : "",
      }));
      setCountries(normalized);
    } catch (err) {
      console.error(err);
    }
  };

  const handleEditClick = (car) => {
    const rawCid =
      car.countryID ?? (car.country && car.country.countryID) ?? "";
    setEditCarData({
      carID: car.carID,
      carName: car.carName,
      unitsInStock: car.unitsInStock,
      unitPrice: car.unitPrice,
      country: { countryID: String(rawCid) },
    });
    setEditError("");
    setShowEditModal(true);
  };

  const handleEditSubmit = async () => {
    if (editCarData.carName.length <= 10)
      return setEditError("Car Name > 10 characters.");
    try {
      await carService.updateCar(editCarData.carID, editCarData);
      setShowEditModal(false);
      fetchCars();
    } catch (err) {
      setEditError("Update failed.");
    }
  };

  const handleDeleteClick = (car) => {
    setDeleteCarID(car.carID);
    setDeleteCarName(car.carName);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await carService.deleteCar(deleteCarID);
      setShowDeleteModal(false);
      fetchCars();
    } catch (err) {
      setDeleteError("Delete failed.");
    }
  };

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
      <Modal
        show={showEditModal}
        onHide={() => setShowEditModal(false)}
        centered
        size="lg"
      >
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
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleEditSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      {/* MODAL DELETE */}
      <Modal
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        centered
      >
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
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
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
