import React, { useState, useEffect } from "react";
import { Button, Table } from "react-bootstrap";
import { newsService } from "../../services/newsService";
import NewsArticleModal from "../../components/modals/NewsArticleModal";
import { authService } from "../../services/authService";

const NewsManage = () => {
  const [news, setNews] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedNews, setSelectedNews] = useState(null);

  useEffect(() => {
    loadNews();
  }, []);

  const loadNews = async () => {
    const user = authService.getCurrentUser();
    if (!user || !user.accountID) {
      alert("Phiên đăng nhập hết hạn, vui lòng đăng nhập lại!");
      return;
    }
    const res = await newsService.getAll(user.accountID);
    setNews(res.data);
  };

  const handleSave = async (formData) => {
    try {
      const user = authService.getCurrentUser();

      // Kiểm tra nếu chưa đăng nhập thì không cho lưu
      if (!user || !user.accountID) {
        alert("Phiên đăng nhập hết hạn, vui lòng đăng nhập lại!");
        return;
      }

      // Chuẩn hóa dữ liệu chuẩn 100% để gửi về Backend
      const payload = {
        newsTitle: formData.newsTitle,
        headline: formData.headline,
        newsContent: formData.newsContent,
        newsSource: formData.newsSource,
        newsStatus: parseInt(formData.newsStatus),
        // Gán thủ công ngày hiện tại để tránh bị <null> trong DB
        createdDate: new Date().toISOString(),
        // Bắt buộc gửi object chứa ID cho Category
        category: { categoryID: parseInt(formData.categoryID) },
        // Đảm bảo gán đúng thông tin Staff đang login
        createdBy: { accountID: user.accountID },
        // Chuyển danh sách ID tag thành mảng các Object
        tags: formData.tagIds
          ? formData.tagIds.map((id) => ({ tagID: parseInt(id) }))
          : [],
      };

      if (selectedNews) {
        await newsService.update(selectedNews.newsArticleID, payload);
      } else {
        await newsService.create(payload);
      }

      setShowModal(false);
      loadNews(); // Sau khi lưu, hàm này sẽ gọi GET để cập nhật lại bảng
      alert("Lưu tin tức thành công!");
    } catch (error) {
      console.error("Lỗi gửi dữ liệu:", error.response?.data);
      alert(
        "Lỗi: " +
          (error.response?.data?.message ||
            "Không thể lưu dữ liệu. Kiểm tra lại Backend!"),
      );
    }
  };
  return (
    <div>
      <div className="d-flex justify-content-between mb-3">
        <h3>Quản lý tin tức</h3>
        <Button
          onClick={() => {
            setSelectedNews(null);
            setShowModal(true);
          }}
        >
          + Thêm tin mới
        </Button>
      </div>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Tiêu đề</th>
            <th>Danh mục</th>
            <th>Trạng thái</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {news.map((item) => (
            <tr key={item.newsArticleID}>
              <td>{item.newsArticleID}</td>
              <td>{item.newsTitle}</td>
              <td>{item.category?.categoryName}</td>
              <td>{item.newsStatus === 1 ? "Active" : "Inactive"}</td>
              <td>
                <Button
                  variant="warning"
                  size="sm"
                  onClick={() => {
                    setSelectedNews(item);
                    setShowModal(true);
                  }}
                >
                  Sửa
                </Button>
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
    </div>
  );
};

export default NewsManage;
