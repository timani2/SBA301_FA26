import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const CategoryModal = ({ show, handleClose, handleSave, categoryData }) => {
  const [formData, setFormData] = useState({
    categoryName: "",
    categoryDescription: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (categoryData) setFormData(categoryData);
    else setFormData({ categoryName: "", categoryDescription: "" });
    setErrors({});
  }, [categoryData, show]);

  const validate = () => {
    let newErrors = {};
    if (!formData.categoryName.trim())
      newErrors.categoryName = "Category Name is required";
    if (!formData.categoryDescription.trim())
      newErrors.categoryDescription = "Description is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) handleSave(formData);
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton className="bg-primary text-white">
        <Modal.Title>
          {categoryData ? "Edit Category" : "Add Category"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Category Name</Form.Label>
            <Form.Control
              isInvalid={!!errors.categoryName}
              value={formData.categoryName}
              onChange={(e) =>
                setFormData({ ...formData, categoryName: e.target.value })
              }
            />
            <Form.Control.Feedback type="invalid">
              {errors.categoryName}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              isInvalid={!!errors.categoryDescription}
              value={formData.categoryDescription}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  categoryDescription: e.target.value,
                })
              }
            />
            <Form.Control.Feedback type="invalid">
              {errors.categoryDescription}
            </Form.Control.Feedback>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
export default CategoryModal;
