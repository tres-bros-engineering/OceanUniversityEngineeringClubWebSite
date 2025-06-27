//This post grid (with pagination) is used for news and article pages
import { Container, Row } from "react-bootstrap";
import FormatDate from "../../../utils/FormatDate";
import "./PostGrid.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const PostGrid2 = ({ posts }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;
  const lastIndex = currentPage * postsPerPage;
  const firstIndex = lastIndex - postsPerPage;
  const npage = Math.ceil(posts.length / postsPerPage);
  const numbers = [...Array(npage + 1).keys()].slice(1);

  const navigate = useNavigate();

  return (
    <Container fluid>
      <div>
        {posts.slice(firstIndex, lastIndex).map((post) => (
          <Row
            key={post.id}
            className="border border-white mx-2 mb-3 py-2 rounded post-grid-post"
          >
            <div className="col-lg-4">
              <img src={post.img} className="rounded post-grid-img" alt="..." />
            </div>
            <div className="col-lg-8">
              <h4 className="mb-0">{post.title}</h4>
              <p>
                <span className="bi bi-clock"></span>
                <span className="ms-1">{FormatDate(post.date)}</span>
              </p>
              <p className="my-1" style={{ textAlign: "justify" }}>
                {post.body.length > 150
                  ? post.body.slice(0, 150) + "..."
                  : post.body}
              </p>
              <button
                type="button"
                class="btn btn-outline-light btn-sm mt-1"
                onClick={() =>
                  navigate(formatUrlPath(post.category, post.title), {state: { id: post.id }})
                }
              >
                <span>Read More</span>
                <span className="bi bi-arrow-right ms-1"></span>
              </button>
            </div>
          </Row>
        ))}
      </div>
      {/* Pagination */}
      <div className="d-flex justify-content-center my-4">
        <button
          type="button"
          className={`btn btn-light btn-sm px-2 me-1 mb-1 ${
            currentPage === 1 ? "d-none" : ""
          }`}
          onClick={prePage}
        >
          <span className="bi bi-arrow-left"></span>
        </button>
        {numbers.map((no, index) => (
          <button
            type="button"
            className={`btn btn-light btn-sm px-3 me-1 mb-1 ${
              currentPage === no ? "active" : ""
            }`}
            key={index}
            onClick={() => changeCPage(no)}
          >
            {no}
          </button>
        ))}
        <button
          type="button"
          className={`btn btn-light btn-sm px-2 mb-1 ${
            currentPage === npage ? "d-none" : ""
          }`}
          onClick={nextPage}
        >
          <span className="bi bi-arrow-right"></span>
        </button>
      </div>
    </Container>
  );

  // To Format the title and category as Pathname
  function formatUrlPath(category, title) {
    if (!category) {
      return "/news/" + title.toLowerCase().replace(/\s+/g, "-");
    } else {
      return (
        "/article/" +
        category.toLowerCase().replace(/\s+/g, "-") +
        "/" +
        title.toLowerCase().replace(/\s+/g, "-")
      );
    }
  }

  // Pagination Buttons
  function prePage() {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
      window.scrollTo(0, 0);
    }
  }

  function changeCPage(id) {
    setCurrentPage(id);
    window.scrollTo(0, 0);
  }

  function nextPage() {
    if (currentPage !== npage) {
      setCurrentPage(currentPage + 1);
      window.scrollTo(0, 0);
    }
  }
};

export default PostGrid2;
