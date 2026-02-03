import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import API from "../../services/api";

const NewsArticleModal = ({ show, onHide, onSave, selectedNews }) => {
  const [categories, setCategories] = useState([]);
  const [availableTags, setAvailableTags] = useState([]);
  const [formData, setFormData] = useState({
    newsTitle: "",
    headline: "",
    newsContent: "",
    newsSource: "",
    newsStatus: 1,
    categoryID: "",
    tagIds: [],
  });

  useEffect(() => {
    // Load danh mục và tag để chọn
    const fetchData = async () => {
      const [catRes, tagRes] = await Promise.all([
        API.get("/categories"),
        API.get("/tags"),
      ]);
      setCategories(catRes.data);
      setAvailableTags(tagRes.data);
    };
    if (show) fetchData();

    if (selectedNews) {
      setFormData({
        ...selectedNews,
        categoryID: selectedNews.category?.categoryID || "",
        tagIds: selectedNews.tags?.map((t) => t.tagID) || [],
      });
    } else {
      setFormData({
        newsTitle: "",
        headline: "",
        newsContent: "",
        newsSource: "",
        newsStatus: 1,
        categoryID: "",
        tagIds: [],
      });
    }
  }, [show, selectedNews]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleTagChange = (tagID) => {
    const newTagIds = formData.tagIds.includes(tagID)
      ? formData.tagIds.filter((id) => id !== tagID)
      : [...formData.tagIds, tagID];
    setFormData({ ...formData, tagIds: newTagIds });
  };

  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>
            {selectedNews ? "Sửa tin tức" : "Thêm tin tức mới"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Tiêu đề</Form.Label>
            <Form.Control
              required
              value={formData.newsTitle}
              onChange={(e) =>
                setFormData({ ...formData, newsTitle: e.target.value })
              }
            />
          </Form.Group>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Danh mục</Form.Label>
                <Form.Select
                  required
                  value={formData.categoryID}
                  onChange={(e) =>
                    setFormData({ ...formData, categoryID: e.target.value })
                  }
                >
                  <option value="">-- Chọn danh mục --</option>
                  {categories.map((c) => (
                    <option key={c.categoryID} value={c.categoryID}>
                      {c.categoryName}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Nguồn tin</Form.Label>
                <Form.Control
                  value={formData.newsSource}
                  onChange={(e) =>
                    setFormData({ ...formData, newsSource: e.target.value })
                  }
                />
              </Form.Group>
            </Col>
          </Row>
          <Form.Group className="mb-3">
            <Form.Label>Nội dung</Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
              required
              value={formData.newsContent}
              onChange={(e) =>
                setFormData({ ...formData, newsContent: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Tags</Form.Label>
            <div className="d-flex flex-wrap gap-2">
              {availableTags.map((tag) => (
                <Form.Check
                  key={tag.tagID}
                  type="checkbox"
                  label={tag.tagName}
                  checked={formData.tagIds.includes(tag.tagID)}
                  onChange={() => handleTagChange(tag.tagID)}
                />
              ))}
            </div>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Hủy
          </Button>
          <Button variant="primary" type="submit">
            Lưu lại
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default NewsArticleModal;
