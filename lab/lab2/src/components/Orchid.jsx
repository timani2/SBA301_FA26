import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import Container from "react-bootstrap/Container";
import ListOfOrchids from "./ListOfOrchids";
import FilterSort from "./FilterSort";

function Orchid({ orchidList }) {
  const [filterCategory, setFilterCategory] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get("q") || "";

  const handleFilterChange = (category) => {
    setFilterCategory(category);
  };

  const handleSortChange = (sort) => {
    setSortOption(sort);
  };

  const categories = useMemo(() => {
    const uniqueCategories = [
      ...new Set(orchidList.map((orchid) => orchid.category)),
    ];
    return uniqueCategories;
  }, [orchidList]);

  const filteredAndSortedOrchids = useMemo(() => {
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
