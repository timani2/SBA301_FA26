import React, { useState, useEffect } from "react";
import { Container, Table, Button, Badge } from "react-bootstrap";
import { newsService } from "../../services/newsService";
import NewsArticleModal from "../../components/modals/NewsArticleModal";

const NewsManage = () => {
  const [news, setNews] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedNews, setSelectedNews] = useState(null);

  useEffect(() => {
    loadNews();
  }, []);

  const loadNews = async () => {
    const res = await newsService.getAll();
    setNews(res.data);
  };

  return (
    <Container>
      <h2 className="my-4">News Article Management</h2>
      <Button
        className="mb-3"
        onClick={() => {
          setSelectedNews(null);
          setShowModal(true);
        }}
      >
        Create News
      </Button>
      <Table responsive bordered>
        <thead>
          <tr>
            <th>Title</th>
            <th>Category</th>
            <th>Status</th>
            <th>Tags</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {news.map((n) => (
            <tr key={n.newsArticleID}>
              <td>{n.newsTitle}</td>
              <td>{n.category?.categoryName}</td>
              <td>{n.newsStatus === 1 ? "Active" : "Inactive"}</td>
              <td>
                {n.tags?.map((t) => (
                  <Badge bg="secondary" className="me-1" key={t.tagID}>
                    {t.tagName}
                  </Badge>
                ))}
              </td>
              <td>
                <Button
                  variant="warning"
                  size="sm"
                  onClick={() => {
                    setSelectedNews(n);
                    setShowModal(true);
                  }}
                >
                  Edit
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {/* Modal NewsArticleModal đã viết ở phần trước */}
    </Container>
  );
};
export default NewsManage;
