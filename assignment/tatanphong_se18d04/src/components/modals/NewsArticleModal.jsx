import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { categoryService } from "../../services/categoryService";

const NewsArticleModal = ({ show, onHide, onSave, selectedNews }) => {
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    newsTitle: "",
    headline: "",
    newsContent: "",
    newsSource: "",
    newsStatus: 1,
    categoryID: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    categoryService.getAll().then((res) => setCategories(res.data));
    if (selectedNews) {
      setFormData({
        ...selectedNews,
        categoryID: selectedNews.category?.categoryID || "",
      });
    } else {
      setFormData({
        newsTitle: "",
        headline: "",
        newsContent: "",
        newsSource: "",
        newsStatus: 1,
        categoryID: "",
      });
    }
    setErrors({});
  }, [selectedNews, show]);

  const validate = () => {
    let newErrors = {};
    if (!formData.newsTitle.trim()) newErrors.newsTitle = "Title is required";
    if (!formData.headline.trim()) newErrors.headline = "Headline is required";
    if (!formData.newsContent.trim())
      newErrors.newsContent = "Content is required";
    if (!formData.categoryID) newErrors.categoryID = "Please select a category";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) onSave(formData);
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered backdrop="static">
      <Modal.Header closeButton className="bg-primary text-white">
        <Modal.Title>
          {selectedNews ? "Edit Article" : "Create Article"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label className="fw-bold">Article Title *</Form.Label>
            <Form.Control
              isInvalid={!!errors.newsTitle}
              value={formData.newsTitle}
              onChange={(e) =>
                setFormData({ ...formData, newsTitle: e.target.value })
              }
            />
            <Form.Control.Feedback type="invalid">
              {errors.newsTitle}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="fw-bold">Headline *</Form.Label>
            <Form.Control
              as="textarea"
              rows={2}
              isInvalid={!!errors.headline}
              value={formData.headline}
              onChange={(e) =>
                setFormData({ ...formData, headline: e.target.value })
              }
            />
            <Form.Control.Feedback type="invalid">
              {errors.headline}
            </Form.Control.Feedback>
          </Form.Group>

          <Row className="mb-3">
            <Col md={6}>
              <Form.Group>
                <Form.Label className="fw-bold">Category *</Form.Label>
                <Form.Select
                  isInvalid={!!errors.categoryID}
                  value={formData.categoryID}
                  onChange={(e) =>
                    setFormData({ ...formData, categoryID: e.target.value })
                  }
                >
                  <option value="">-- Select Category --</option>
                  {categories.map((c) => (
                    <option key={c.categoryID} value={c.categoryID}>
                      {c.categoryName}
                    </option>
                  ))}
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors.categoryID}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label className="fw-bold">Source</Form.Label>
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
            <Form.Label className="fw-bold">Full Content *</Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
              isInvalid={!!errors.newsContent}
              value={formData.newsContent}
              onChange={(e) =>
                setFormData({ ...formData, newsContent: e.target.value })
              }
            />
            <Form.Control.Feedback type="invalid">
              {errors.newsContent}
            </Form.Control.Feedback>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Save Article
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
export default NewsArticleModal;
