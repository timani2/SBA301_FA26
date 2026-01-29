// src/page/Orchid.jsx
import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Container, Spinner, Alert } from "react-bootstrap";
import ListOfOrchids from "../components/ListOfOrchids";
import FilterSort from "../components/FilterSort";
import CarouselBanner from "../components/CarouselBanner";
import { OrchidService } from "../service/OrchidService";

function Orchid() {
  const [orchidList, setOrchidList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterCategory, setFilterCategory] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get("q") || "";

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const data = await OrchidService.getAllOrchids();
        setOrchidList(data);
      } catch (err) {
        setError("Lỗi kết nối backend Spring Boot.");
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const categories = useMemo(() => {
    const unique = [
      ...new Set(orchidList.map((o) => o.orchidCategory?.categoryName)),
    ];
    return unique.filter(Boolean);
  }, [orchidList]);

  const filteredOrchids = useMemo(() => {
    let result = orchidList.filter((o) => {
      const matchesCat =
        !filterCategory || o.orchidCategory?.categoryName === filterCategory;
      const matchesSearch =
        !searchTerm ||
        o.orchidName.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCat && matchesSearch;
    });
    if (sortOption === "name-asc")
      result.sort((a, b) => a.orchidName.localeCompare(b.orchidName));
    return result;
  }, [orchidList, filterCategory, sortOption, searchTerm]);

  if (loading)
    return (
      <Container className="text-center py-5">
        <Spinner animation="border" />
      </Container>
    );

  return (
    <div>
      <Container className="py-4">
        <FilterSort
          categories={categories}
          onFilterChange={setFilterCategory}
          onSortChange={setSortOption}
        />
        <hr />
        {filteredOrchids.length > 0 ? (
          <ListOfOrchids orchidList={filteredOrchids} />
        ) : (
          <p className="text-center mt-4">Không tìm thấy sản phẩm nào.</p>
        )}
      </Container>
    </div>
  );
}

export default Orchid;
