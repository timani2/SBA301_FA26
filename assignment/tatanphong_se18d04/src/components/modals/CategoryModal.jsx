import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const CategoryModal = ({
  show,
  handleClose,
  handleSave,
  categoryData,
  categories,
}) => {
  // State để quản lý dữ liệu trong Form
  const [formData, setFormData] = useState({
    categoryName: "",
    categoryDesciption: "",
    isActive: true,
    parentCategory: null,
  });

  // Cập nhật form khi mở Modal (để Sửa hoặc Thêm mới)
  useEffect(() => {
    if (categoryData) {
      setFormData(categoryData); // Nếu có dữ liệu cũ -> Trang thái Sửa
    } else {
      setFormData({
        categoryName: "",
        categoryDesciption: "",
        isActive: true,
        parentCategory: null,
      }); // Thêm mới
    }
  }, [categoryData, show]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleParentChange = (e) => {
    const parentId = e.target.value;
    setFormData({
      ...formData,
      parentCategory: parentId ? { categoryID: parseInt(parentId) } : null,
    });
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>
          {categoryData ? "Update Category" : "Create New Category"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Category Name</Form.Label>
            <Form.Control
              type="text"
              name="categoryName"
              value={formData.categoryName}
              onChange={handleChange}
              placeholder="Enter name"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="categoryDesciption"
              value={formData.categoryDesciption}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Parent Category</Form.Label>
            <Form.Select
              name="parentCategory"
              onChange={handleParentChange}
              value={formData.parentCategory?.categoryID || ""}
            >
              <option value="">None (Root Category)</option>
              {categories.map((cat) => (
                <option key={cat.categoryID} value={cat.categoryID}>
                  {cat.categoryName}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Check
              type="checkbox"
              label="Is Active"
              name="isActive"
              checked={formData.isActive}
              onChange={handleChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={() => handleSave(formData)}>
          {categoryData ? "Save Changes" : "Create"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CategoryModal;
