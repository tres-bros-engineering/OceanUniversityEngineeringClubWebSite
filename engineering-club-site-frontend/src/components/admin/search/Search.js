import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import "./Search.css";

const Search = ({ url }) => {
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;

    navigate(url, {
      state: { searchResult: searchTerm },
    });

    setSearchTerm("");
  };

  return (
    <div className="search-component-admin">
      <form className="d-flex position-relative" onSubmit={handleSearch}>
        <Form.Control
          type="search"
          placeholder="Search..."
          className="me-2 search-input pe-2"
          aria-label="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <i className="bi bi-search search-icon pe-2"></i>
      </form>
    </div>
  );
};

export default Search;
