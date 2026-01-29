import React, { useEffect, useState } from "react";
// Thêm Row và Col vào danh sách import từ react-bootstrap
import {
  Table,
  Button,
  Container,
  Modal,
  Form,
  Image,
  Badge,
  Row,
  Col,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../contexts/AuthContext";
import { OrchidService } from "../service/OrchidService";

const ManageOrchid = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [orchids, setOrchids] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const [currentOrchid, setCurrentOrchid] = useState({
    orchidName: "",
    orchidURL: "",
    orchidDescription: "",
    price: 0,
    isNatural: false,
    isAttractive: false,
    orchidCategory: { categoryID: "" },
  });

  const loadData = async () => {
    try {
      const [orchRes, catRes] = await Promise.all([
        OrchidService.getAllOrchids(),
        OrchidService.getAllCategories(),
      ]);
      setOrchids(orchRes);
      setCategories(catRes);
    } catch (e) {
      toast.error("Lỗi tải dữ liệu từ server!");
    }
  };

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    } else {
      loadData();
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!currentOrchid.orchidCategory.categoryID) {
      toast.warning("Vui lòng chọn danh mục cho hoa lan!");
      return;
    }
    try {
      if (currentOrchid.orchidID) {
        await OrchidService.updateOrchid(currentOrchid.orchidID, currentOrchid);
        toast.success("Cập nhật thông tin hoa thành công!");
      } else {
        await OrchidService.createOrchid(currentOrchid);
        toast.success("Thêm mới hoa lan thành công!");
      }
      setShowModal(false);
      loadData();
    } catch (e) {
      toast.error("Thao tác thất bại. Vui lòng kiểm tra lại!");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa hoa lan này không?")) {
      try {
        await OrchidService.deleteOrchid(id);
        toast.success("Đã xóa hoa lan thành công!");
        loadData();
      } catch (e) {
        toast.error("Không thể xóa sản phẩm này!");
      }
    }
  };

  return (
    <Container className="mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Hệ thống quản lý hoa Lan</h2>
        <Button
          variant="primary"
          onClick={() => {
            setCurrentOrchid({
              orchidName: "",
              orchidURL: "",
              orchidDescription: "",
              price: 0,
              isNatural: false,
              isAttractive: false,
              orchidCategory: { categoryID: "" },
            });
            setShowModal(true);
          }}
        >
          + Thêm hoa mới
        </Button>
      </div>

      <Table striped bordered hover responsive className="shadow-sm">
        <thead className="table-dark text-center">
          <tr>
            <th>ID</th>
            <th>Ảnh</th>
            <th>Tên hoa</th>
            <th>Giá ($)</th>
            <th>Danh mục</th>
            <th>Tự nhiên</th>
            <th>Đặc biệt</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody className="align-middle text-center">
          {orchids.map((o) => (
            <tr key={o.orchidID}>
              <td>{o.orchidID}</td>
              <td>
                <Image
                  src={o.orchidURL}
                  width="60"
                  height="60"
                  style={{ objectFit: "cover" }}
                  thumbnail
                  alt={o.orchidName}
                />
              </td>
              <td className="fw-bold">{o.orchidName}</td>
              <td className="text-danger fw-bold">${o.price}</td>
              <td>{o.orchidCategory?.categoryName || "N/A"}</td>
              <td>{o.isNatural ? "✅" : "❌"}</td>
              <td>
                {o.isAttractive ? (
                  <Badge bg="warning" text="dark">
                    Hot
                  </Badge>
                ) : (
                  <Badge bg="secondary">Thường</Badge>
                )}
              </td>
              <td>
                <Button
                  variant="outline-warning"
                  size="sm"
                  className="me-2"
                  onClick={() => {
                    setCurrentOrchid(o);
                    setShowModal(true);
                  }}
                >
                  Edit
                </Button>
                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={() => handleDelete(o.orchidID)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            {currentOrchid.orchidID ? "Cập nhật thông tin hoa" : "Thêm hoa mới"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Tên hoa</Form.Label>
                  <Form.Control
                    required
                    value={currentOrchid.orchidName}
                    onChange={(e) =>
                      setCurrentOrchid({
                        ...currentOrchid,
                        orchidName: e.target.value,
                      })
                    }
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Giá bán ($)</Form.Label>
                  <Form.Control
                    type="number"
                    required
                    value={currentOrchid.price}
                    onChange={(e) =>
                      setCurrentOrchid({
                        ...currentOrchid,
                        price: e.target.value,
                      })
                    }
                  />
                </Form.Group>
              </Col>
            </Row>
            <Form.Group className="mb-3">
              <Form.Label>Link ảnh (URL)</Form.Label>
              <Form.Control
                required
                value={currentOrchid.orchidURL}
                onChange={(e) =>
                  setCurrentOrchid({
                    ...currentOrchid,
                    orchidURL: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Danh mục</Form.Label>
              <Form.Select
                required
                value={currentOrchid.orchidCategory?.categoryID || ""}
                onChange={(e) =>
                  setCurrentOrchid({
                    ...currentOrchid,
                    orchidCategory: { categoryID: e.target.value },
                  })
                }
              >
                <option value="">Chọn danh mục...</option>
                {categories.map((c) => (
                  <option key={c.categoryID} value={c.categoryID}>
                    {c.categoryName}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <div className="d-flex gap-4 mb-3">
              <Form.Check
                type="checkbox"
                label="Môi trường tự nhiên"
                checked={currentOrchid.isNatural}
                onChange={(e) =>
                  setCurrentOrchid({
                    ...currentOrchid,
                    isNatural: e.target.checked,
                  })
                }
              />
              <Form.Check
                type="checkbox"
                label="Sản phẩm đặc biệt (Hot/Attractive)"
                checked={currentOrchid.isAttractive}
                onChange={(e) =>
                  setCurrentOrchid({
                    ...currentOrchid,
                    isAttractive: e.target.checked,
                  })
                }
              />
            </div>
            <Form.Group className="mb-3">
              <Form.Label>Mô tả sản phẩm</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                value={currentOrchid.orchidDescription}
                onChange={(e) =>
                  setCurrentOrchid({
                    ...currentOrchid,
                    orchidDescription: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Button type="submit" className="w-100" variant="success">
              {currentOrchid.orchidID ? "Lưu thay đổi" : "Tạo mới ngay"}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default ManageOrchid;
