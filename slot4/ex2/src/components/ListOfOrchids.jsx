// src/components/ListOfOrchids.jsx
import { useState } from "react";
import { useSearchParams, Link } from "react-router-dom"; // <--- Import Link
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button"; // Có thể bỏ nếu dùng Link thuần
import FilterSort from "./FilterSort";

function ListOfOrchids({ orchidList }) {
  // Bỏ props onShowModal nếu không dùng Modal nữa
  const [searchParams] = useSearchParams();
  const searchText = searchParams.get("q") || "";
  const [filterCategory, setFilterCategory] = useState("");
  const [sortType, setSortType] = useState("");

  const getProcessedList = () => {
    // ... (Giữ nguyên logic filter/sort của bạn) ...
    let processed = [...orchidList];
    if (searchText) {
      processed = processed.filter((orchid) =>
        orchid.orchidName.toLowerCase().includes(searchText.toLowerCase())
      );
    }
    if (filterCategory) {
      processed = processed.filter(
        (orchid) => orchid.category === filterCategory
      );
    }
    if (sortType) {
      processed.sort((a, b) => {
        switch (sortType) {
          case "name-asc":
            return a.orchidName.localeCompare(b.orchidName);
          case "name-desc":
            return b.orchidName.localeCompare(a.orchidName);
          case "price-asc":
            return (a.price || 0) - (b.price || 0);
          case "price-desc":
            return (b.price || 0) - (a.price || 0);
          default:
            return 0;
        }
      });
    }
    return processed;
  };

  const categories = [...new Set(orchidList.map((orchid) => orchid.category))];
  const displayedOrchids = getProcessedList();

  return (
    <>
      <FilterSort
        categories={categories}
        onFilterChange={setFilterCategory}
        onSortChange={setSortType}
      />

      <Row>
        {displayedOrchids.length > 0 ? (
          displayedOrchids.map((orchid) => (
            <Col md={3} key={orchid.id} className="mb-4 d-flex">
              <Card className="h-100 w-100 position-relative shadow-sm">
                <Card.Img
                  variant="top"
                  src={orchid.image}
                  style={{ height: "250px", objectFit: "cover" }}
                />
                <Card.Body>
                  <Card.Title>{orchid.orchidName}</Card.Title>
                  <span className="text-danger fw-bold">${orchid.price}</span>
                  <div className="d-grid mt-3">
                    {/* Sử dụng Link để chuyển sang trang detail */}
                    <Link
                      to={`/detail/${orchid.id}`}
                      className="btn btn-primary"
                    >
                      Detail
                    </Link>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <Col xs={12} className="text-center mt-5">
            <h5 className="text-muted">
              Không tìm thấy kết quả nào phù hợp 😞
            </h5>
          </Col>
        )}
      </Row>
    </>
  );
}

export default ListOfOrchids;
