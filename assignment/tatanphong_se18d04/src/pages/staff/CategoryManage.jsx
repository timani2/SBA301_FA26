import React, { useState, useEffect } from "react";
import { Container, Table, Button, Stack, Badge } from "react-bootstrap";
import { categoryService } from "../../services/categoryService";
import CategoryModal from "../../components/modals/CategoryModal";
import ConfirmModal from "../../components/modals/ConfirmModal";
import { toast } from "react-toastify";

const CategoryManage = () => {
  const [categories, setCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedCat, setSelectedCat] = useState(null);

  const [showConfirm, setShowConfirm] = useState(false);
  const [targetId, setTargetId] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const res = await categoryService.getAll();
    setCategories(res.data);
  };

  const confirmDelete = (id) => {
    setTargetId(id);
    setShowConfirm(true);
  };

  const handleDelete = async () => {
    try {
      const res = await categoryService.delete(targetId);
      toast.success(res.data || "Xóa danh mục thành công!");
      loadData();
    } catch (err) {
      toast.error(err.response?.data || "Lỗi khi xóa danh mục!");
    } finally {
      setShowConfirm(false);
    }
  };

  const handleSave = async (data) => {
    try {
      if (selectedCat) await categoryService.update(data.categoryID, data);
      else await categoryService.create(data);
      toast.success("Lưu danh mục thành công!");
      setShowModal(false);
      loadData();
    } catch (err) {
      toast.error("Lỗi khi lưu dữ liệu");
    }
  };

  return (
    <Container className="mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Category Management</h2>
        <Button
          variant="primary"
          onClick={() => {
            setSelectedCat(null);
            setShowModal(true);
          }}
        >
          + Add Category
        </Button>
      </div>

      <Table striped bordered hover responsive style={{ tableLayout: "fixed" }}>
        <thead className="table-dark">
          <tr>
            <th style={{ width: "80px" }}>ID</th>
            <th>Name</th>
            <th style={{ width: "120px" }}>Status</th>
            <th style={{ width: "180px" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((c) => (
            <tr key={c.categoryID} style={{ verticalAlign: "middle" }}>
              <td>{c.categoryID}</td>
              <td>{c.categoryName}</td>
              <td>
                <Badge className={c.isActive ? "bg-success" : "bg-secondary"}>
                  {c.isActive ? "Active" : "Inactive"}
                </Badge>
              </td>

              <td>
                <Stack direction="horizontal" gap={2}>
                  <Button
                    variant="warning"
                    size="sm"
                    style={{ width: "70px" }}
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
                    style={{ width: "70px" }}
                    onClick={() => confirmDelete(c.categoryID)}
                  >
                    Delete
                  </Button>
                </Stack>
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

      <ConfirmModal
        show={showConfirm}
        handleClose={() => setShowConfirm(false)}
        title="Xác nhận xóa"
        body="Bạn có chắc chắn muốn xóa danh mục này?"
        onConfirm={handleDelete}
      />
    </Container>
  );
};
export default CategoryManage;
