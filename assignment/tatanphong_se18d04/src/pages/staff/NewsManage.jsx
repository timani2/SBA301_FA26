import React, { useState, useEffect } from "react";
import { Button, Table, Container, Stack, Badge } from "react-bootstrap";
import { newsService } from "../../services/newsService";
import NewsArticleModal from "../../components/modals/NewsArticleModal";
import ConfirmModal from "../../components/modals/ConfirmModal";
import { authService } from "../../services/authService";
import { toast } from "react-toastify";

const NewsManage = () => {
  const [news, setNews] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedNews, setSelectedNews] = useState(null);

  const [showConfirm, setShowConfirm] = useState(false);
  const [targetId, setTargetId] = useState(null);

  useEffect(() => {
    loadNews();
  }, []);

  const loadNews = async () => {
    const user = authService.getCurrentUser();
    if (!user) return;
    const res = await newsService.getAll(user.accountID);
    setNews(res.data);
  };

  const confirmDelete = (id) => {
    setTargetId(id);
    setShowConfirm(true);
  };

  const handleDelete = async () => {
    try {
      await newsService.delete(targetId);
      toast.success("Xóa bài viết thành công!");
      loadNews();
    } catch (err) {
      toast.error("Không thể xóa bài viết này!");
    } finally {
      setShowConfirm(false);
    }
  };

  const handleSave = async (formData) => {
    try {
      const user = authService.getCurrentUser();
      const payload = {
        ...formData,
        newsStatus: parseInt(formData.newsStatus),
        createdDate: new Date().toISOString(),
        category: { categoryID: parseInt(formData.categoryID) },
        createdBy: { accountID: user.accountID },
        tags: formData.tagIds
          ? formData.tagIds.map((id) => ({ tagID: parseInt(id) }))
          : [],
      };

      if (selectedNews)
        await newsService.update(selectedNews.newsArticleID, payload);
      else await newsService.create(payload);

      setShowModal(false);
      loadNews();
      toast.success("Lưu bài viết thành công!");
    } catch (error) {
      toast.error("Lỗi: Không thể lưu bài viết!");
    }
  };

  return (
    <Container className="mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3>Quản lý tin tức</h3>
        <Button
          variant="primary"
          onClick={() => {
            setSelectedNews(null);
            setShowModal(true);
          }}
        >
          + Thêm tin mới
        </Button>
      </div>

      <Table striped bordered hover responsive style={{ tableLayout: "fixed" }}>
        <thead className="table-dark">
          <tr>
            <th style={{ width: "70px" }}>ID</th>
            <th>Tiêu đề</th>
            <th style={{ width: "150px" }}>Danh mục</th>
            <th style={{ width: "120px" }}>Trạng thái</th>
            <th style={{ width: "180px" }}>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {news.map((item) => (
            <tr key={item.newsArticleID} style={{ verticalAlign: "middle" }}>
              <td>{item.newsArticleID}</td>
              <td className="text-truncate">{item.newsTitle}</td>
              <td>{item.category?.categoryName}</td>
              <td>
                <Badge bg={item.newsStatus === 1 ? "success" : "secondary"}>
                  {item.newsStatus === 1 ? "Active" : "Inactive"}
                </Badge>
              </td>
              <td>
                <Stack direction="horizontal" gap={2}>
                  <Button
                    variant="warning"
                    size="sm"
                    style={{ width: "70px" }}
                    onClick={() => {
                      setSelectedNews(item);
                      setShowModal(true);
                    }}
                  >
                    Sửa
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    style={{ width: "70px" }}
                    onClick={() => confirmDelete(item.newsArticleID)}
                  >
                    Xóa
                  </Button>
                </Stack>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <NewsArticleModal
        show={showModal}
        onHide={() => setShowModal(false)}
        onSave={handleSave}
        selectedNews={selectedNews}
      />

      <ConfirmModal
        show={showConfirm}
        handleClose={() => setShowConfirm(false)}
        title="Xác nhận xóa bài viết"
        body="Bạn có chắc chắn muốn xóa bài viết này không?"
        onConfirm={handleDelete}
      />
    </Container>
  );
};
export default NewsManage;
