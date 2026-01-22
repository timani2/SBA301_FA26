import { useState, useMemo, useEffect } from "react"; // Thêm useEffect
import { useSearchParams } from "react-router-dom";
import Container from "react-bootstrap/Container";
import ListOfOrchids from "../components/ListOfOrchids";
import FilterSort from "../components/FilterSort";
import Spinner from "react-bootstrap/Spinner"; // UI loading
import Alert from "react-bootstrap/Alert"; //  UI lỗi
import { fetchOrchids } from "../service/OrchidService";

// function Orchid({ orchidList }) { //  Nhận props
function Orchid() {
  // Không nhận props

  // State quản lý dữ liệu API ---
  const [orchidList, setOrchidList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // -------------------------------------------

  const [filterCategory, setFilterCategory] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get("q") || "";

  // --- CODE MỚI: Gọi API ---
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const data = await fetchOrchids();
        setOrchidList(data);
      } catch (err) {
        setError("Không thể tải dữ liệu từ máy chủ.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);
  // ------------------------

  const handleFilterChange = (category) => {
    setFilterCategory(category);
  };

  const handleSortChange = (sort) => {
    setSortOption(sort);
  };

  const categories = useMemo(() => {
    // if (!orchidList) return []; // <-- CODE CŨ (Implicit check trong logic cũ)
    if (!orchidList.length) return []; //  Kiểm tra length

    const uniqueCategories = [
      ...new Set(orchidList.map((orchid) => orchid.category)),
    ];
    return uniqueCategories;
  }, [orchidList]);

  const filteredAndSortedOrchids = useMemo(() => {
    if (!orchidList.length) return []; // Safety check

    let filtered = orchidList.filter((orchid) => {
      const matchesCategory =
        !filterCategory || orchid.category === filterCategory;
      const matchesSearch =
        !searchTerm ||
        orchid.orchidName.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });

    if (sortOption) {
      filtered.sort((a, b) => {
        switch (sortOption) {
          case "price-asc":
            return a.price - b.price;
          case "price-desc":
            return b.price - a.price;
          case "name-asc":
            return a.orchidName.localeCompare(b.orchidName);
          case "name-desc":
            return b.orchidName.localeCompare(a.orchidName);
          default:
            return 0;
        }
      });
    }

    return filtered;
  }, [orchidList, filterCategory, sortOption, searchTerm]);

  // ---  Xử lý hiển thị Loading/Error ---
  if (loading) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" variant="primary" />
        <p>Đang tải dữ liệu...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="py-5">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }
  // ----------------------------------------------

  return (
    <div>
      <Container className="py-5">
        <FilterSort
          categories={categories}
          onFilterChange={handleFilterChange}
          onSortChange={handleSortChange}
        />
        {filteredAndSortedOrchids.length > 0 ? (
          <ListOfOrchids orchidList={filteredAndSortedOrchids} />
        ) : (
          <p className="text-center">Không tìm thấy kết quả nào phù hợp.</p>
        )}
      </Container>
    </div>
  );
}

export default Orchid;
