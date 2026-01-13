import React from "react";
import { Form, InputGroup } from "react-bootstrap";

const SearchBar = ({ searchText, handleSearch, className }) => {
  return (
    // Nhận thêm props className từ cha để cha tự chỉnh layout
    <div className={className}>
      <InputGroup>
        <Form.Control
          type="text"
          placeholder="Tìm kiếm tên hoa lan..."
          aria-label="Search"
          aria-describedby="search-icon"
          value={searchText}
          onChange={(e) => handleSearch(e.target.value)}
        />
      </InputGroup>
    </div>
  );
};

export default SearchBar;
