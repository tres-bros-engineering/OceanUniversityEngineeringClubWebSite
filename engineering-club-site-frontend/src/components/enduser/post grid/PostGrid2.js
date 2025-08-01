//This post grid (with pagination) is used for news and article pages
import { Container, NavLink, Row } from "react-bootstrap";
import FormatDate from "../../../utils/FormatDate";
import "./PostGrid.css";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import NoPostFoundAnimation from "../../../utils/animation/NoPostFoundAnimation";
import PostUrlFormat from "../../../utils/PostUrlFormat";
import truncate from 'truncate-html'

const PostGrid2 = ({ posts }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;
  const lastIndex = currentPage * postsPerPage;
  const firstIndex = lastIndex - postsPerPage;
  const npage = Math.ceil(posts.length / postsPerPage);
  const numbers = [...Array(npage + 1).keys()].slice(1);

  const navigate = useNavigate();
  const location = useLocation();

  // Pagination Buttons Functions
  const prePage = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
      window.scrollTo(0, 0);
    }
  };

  const changeCPage = (id) => {
    setCurrentPage(id);
    window.scrollTo(0, 0);
  };

  const nextPage = () => {
    if (currentPage !== npage) {
      setCurrentPage(currentPage + 1);
      window.scrollTo(0, 0);
    }
  };

  return (
    <Container fluid className="post-grid">
      <div>
        {posts.length > 0 ? (
          posts?.slice(firstIndex, lastIndex).map((post, index) => (
            <Row
              key={index}
              className="border border-white mx-2 mb-3 py-2 rounded post-grid-post"
            >
              <div className="col-lg-4">
                <img
                  src={post.img}
                  className="rounded post-grid-img"
                  alt="..."
                />
              </div>
              <div className="col-lg-8">
                <h4 className="mb-0">{post.title}</h4>
                <p>
                  <span className="bi bi-clock"></span>
                  <span className="ms-1">{FormatDate(post.date)}</span>
                </p>
                <div className="my-1 rich-text-display" style={{ textAlign: "justify" }}>
                  {truncate(post.body, 300, { stripTags: true })}
                </div>
                <button
                  type="button"
                  class="btn btn-outline-light btn-sm mt-1"
                  onClick={() =>
                    navigate(PostUrlFormat(post.category, post.title))
                  }
                >
                  <span>Read More</span>
                  <span className="bi bi-arrow-right ms-1"></span>
                </button>
              </div>
            </Row>
          ))
        ) : (
          <>
            <div className="d-flex justify-content-center">
              <NoPostFoundAnimation />
            </div>
            {location.pathname === "/search-results" ? (
              <h4 className="text-center mb-5">No Results Found!</h4>
            ) : (
              <h4 className="text-center mb-4">No Posts Found!</h4>
            )}
          </>
        )}
      </div>

      {/* Pagination */}
      {posts.length > 0 && (
        <div className="d-flex justify-content-center my-4">
          <NavLink
            className={`pagination-btn px-2 mb-1 mx-2 ${
              currentPage === 1 ? "d-none" : ""
            }`}
            onClick={prePage}
          >
            <span className="bi bi-chevron-left"></span>
          </NavLink>
          {numbers.map((no, index) => (
            <NavLink
              className={`pagination-btn px-2 mb-1 mx-2 ${
                currentPage === no ? "active disabled opacity-100" : ""
              }`}
              key={index}
              onClick={() => changeCPage(no)}
            >
              {no}
            </NavLink>
          ))}
          <NavLink
            className={`pagination-btn px-2 mb-1 mx-2 ${
              currentPage === npage ? "d-none" : ""
            }`}
            onClick={nextPage}
          >
            <span className="bi bi-chevron-right"></span>
          </NavLink>
        </div>
      )}
    </Container>
  );
};

export default PostGrid2;
