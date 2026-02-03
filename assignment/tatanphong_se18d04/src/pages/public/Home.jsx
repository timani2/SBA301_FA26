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
      const response = await newsService.getPublicNews();
      // Kiểm tra dữ liệu trả về phải là mảng mới cập nhật state
      if (Array.isArray(response.data)) {
        setNewsList(response.data);
      } else {
        setNewsList([]);
      }
    } catch (error) {
      console.error("Lỗi khi tải tin tức:", error);
      setNewsList([]);
    }
  };

  // Fix lỗi triệt để bằng cách kiểm tra Array.isArray trước khi filter
  const filteredNews = Array.isArray(newsList)
    ? newsList.filter((news) => {
        const title = news.newsTitle ? news.newsTitle.toLowerCase() : "";
        const headline = news.headline ? news.headline.toLowerCase() : "";
        const search = searchTerm.toLowerCase();
        return title.includes(search) || headline.includes(search);
      })
    : [];

  return (
    <Container fluid className="p-4">
      {" "}
      {/* fluid giúp tràn toàn màn hình */}
      <h2 className="my-4 text-center text-primary fw-bold">Latest News</h2>
      <Row className="mb-4 justify-content-center">
        <Col md={6}>
          <InputGroup>
            <Form.Control
              placeholder="Tìm kiếm tin tức..."
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
              <Card className="h-100 shadow-sm border-0">
                <Card.Body>
                  <Badge bg="info" className="mb-2">
                    {news.category?.categoryName}
                  </Badge>
                  <Card.Title className="fw-bold">{news.newsTitle}</Card.Title>
                  <Card.Text className="text-muted">{news.headline}</Card.Text>
                  <div className="mt-3">
                    {news.tags?.map((tag) => (
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
            <p>Không tìm thấy bài viết nào.</p>
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default Home;
