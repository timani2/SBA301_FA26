import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Badge,
  Form,
  InputGroup,
} from "react-bootstrap";
import { newsService } from "../../services/newsService";

const Home = () => {
  const [newsList, setNewsList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    loadPublicNews();
  }, []);

  const loadPublicNews = async () => {
    try {
      // Chỉ lấy tin tức có trạng thái active (1) theo yêu cầu
      const response = await newsService.getPublicNews();
      setNewsList(response.data);
    } catch (error) {
      console.error("Lỗi khi tải tin tức:", error);
    }
  };

  // Tính năng tìm kiếm (Search) theo yêu cầu đề bài [cite: 10, 50]
  const filteredNews = newsList.filter(
    (news) =>
      news.newsTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      news.headline.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <Container>
      <h2 className="my-4 text-center text-primary">Latest News</h2>

      {/* Thanh tìm kiếm bài viết  */}
      <Row className="mb-4 justify-content-center">
        <Col md={6}>
          <InputGroup>
            <Form.Control
              placeholder="Search news by title or headline..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </InputGroup>
        </Col>
      </Row>

      <Row>
        {filteredNews.length > 0 ? (
          filteredNews.map((news) => (
            <Col key={news.newsArticleID} md={4} className="mb-4">
              <Card className="h-100 shadow-sm">
                <Card.Body>
                  <Badge bg="info" className="mb-2">
                    {news.category?.categoryName}
                  </Badge>
                  <Card.Title>{news.newsTitle}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted small">
                    {new Date(news.createdDate).toLocaleDateString()} | Source:{" "}
                    {news.newsSource}
                  </Card.Subtitle>
                  <Card.Text>{news.headline}</Card.Text>
                  <div className="mt-auto">
                    {/* Hiển thị các Tags liên quan  */}
                    {news.tags &&
                      news.tags.map((tag) => (
                        <Badge
                          pill
                          bg="secondary"
                          key={tag.tagID}
                          className="me-1"
                        >
                          #{tag.tagName}
                        </Badge>
                      ))}
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <Col className="text-center">
            <p className="text-muted">No active news found.</p>
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default Home;
