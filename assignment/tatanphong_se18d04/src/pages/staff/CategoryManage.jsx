import React, { useState, useEffect } from "react";
import {
  Container,
  Table,
  Button,
  Form,
  InputGroup,
  Alert,
} from "react-bootstrap";
import { categoryService } from "../../services/categoryService";
import CategoryModal from "../../components/modals/CategoryModal";

const CategoryManage = () => {
  const [categories, setCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedCat, setSelectedCat] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [msg, setMsg] = useState({ type: "", content: "" });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const res = await categoryService.getAll();
    setCategories(res.data);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Xác nhận xóa danh mục này?")) {
      try {
        const res = await categoryService.delete(id);
        setMsg({ type: "success", content: res.data });
        loadData();
      } catch (err) {
        setMsg({ type: "danger", content: err.response?.data });
      }
    }
  };

  const handleSave = async (data) => {
    try {
      if (selectedCat) await categoryService.update(data.categoryID, data);
      else await categoryService.create(data);
      setShowModal(false);
      loadData();
    } catch (err) {
      setMsg({ type: "danger", content: "Lỗi lưu dữ liệu" });
    }
  };

  return (
    <Container>
      <div className="d-flex justify-content-between my-4">
        <h2>Category Management</h2>
        <Button
          onClick={() => {
            setSelectedCat(null);
            setShowModal(true);
          }}
        >
          + Add Category
        </Button>
      </div>
      {msg.content && (
        <Alert variant={msg.type} dismissible>
          {msg.content}
        </Alert>
      )}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((c) => (
            <tr key={c.categoryID}>
              <td>{c.categoryID}</td>
              <td>{c.categoryName}</td>
              <td>{c.isActive ? "Active" : "Inactive"}</td>
              <td>
                <Button
                  variant="warning"
                  size="sm"
                  onClick={() => {
                    setSelectedCat(c);
                    setShowModal(true);
                  }}
                >
                  Edit
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDelete(c.categoryID)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <CategoryModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        handleSave={handleSave}
        categoryData={selectedCat}
        categories={categories}
      />
    </Container>
  );
};
export default CategoryManage;
