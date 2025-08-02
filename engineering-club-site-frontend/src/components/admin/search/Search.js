import Form from "react-bootstrap/Form";
import "./Search.css";

const Search = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="search-component-admin">
      <div className="search-component-admin d-flex position-relative">
        <Form.Control
          type="search"
          placeholder="Search..."
          className="me-2 search-input pe-2"
          aria-label="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <i className="bi bi-search search-icon pe-2"></i>
      </div>
    </div>
  );
};

export default Search;
