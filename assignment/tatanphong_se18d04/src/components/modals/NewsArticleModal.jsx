import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const NewsArticleModal = ({
  show,
  handleClose,
  handleSave,
  newsData,
  categories,
  allTags,
}) => {
  const [formData, setFormData] = useState({
    newsTitle: "",
    headline: "",
    newsContent: "",
    newsSource: "",
    newsStatus: 1,
    category: { categoryID: "" },
    tags: [],
  });

  useEffect(() => {
    if (newsData) setFormData(newsData);
    else
      setFormData({
        newsTitle: "",
        headline: "",
        newsContent: "",
        newsSource: "",
        newsStatus: 1,
        category: { categoryID: "" },
        tags: [],
      });
  }, [newsData, show]);

  // Xử lý chọn Tags (Many-to-Many)
  const handleTagChange = (tag) => {
    const isExist = formData.tags.find((t) => t.tagID === tag.tagID);
    if (isExist) {
      setFormData({
        ...formData,
        tags: formData.tags.filter((t) => t.tagID !== tag.tagID),
      });
    } else {
      setFormData({ ...formData, tags: [...formData.tags, tag] });
    }
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>
          {newsData ? "Edit Article" : "Create Article"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              value={formData.newsTitle}
              onChange={(e) =>
                setFormData({ ...formData, newsTitle: e.target.value })
              }
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Category</Form.Label>
            <Form.Select
              value={formData.category.categoryID}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  category: { categoryID: e.target.value },
                })
              }
            >
              <option value="">Select Category</option>
              {categories.map((c) => (
                <option key={c.categoryID} value={c.categoryID}>
                  {c.categoryName}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Tags</Form.Label>
            <div className="d-flex flex-wrap gap-2">
              {allTags.map((tag) => (
                <Form.Check
                  key={tag.tagID}
                  type="checkbox"
                  label={tag.tagName}
                  checked={formData.tags.some((t) => t.tagID === tag.tagID)}
                  onChange={() => handleTagChange(tag)}
                />
              ))}
            </div>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={() => handleSave(formData)}>
          Save Article
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
export default NewsArticleModal;
