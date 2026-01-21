//This post grid (with pagination) is used for all users
import { Container, NavLink, Row } from "react-bootstrap";
import FormatDate from "../../utils/FormatDate";
import "./PostGrid.css";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import NoPostFoundAnimation from "../../utils/animation/NoPostFoundAnimation";
import PostUrlFormat from "../../utils/PostUrlFormat";
import truncate from 'truncate-html'

const PaginationPostGrid = ({ posts, styleType }) => {
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
    <Container fluid className={styleType}>
      <div>
        {posts.length > 0 ? (
          posts?.slice(firstIndex, lastIndex).map((post, index) => (
            <Row
              key={index}
              className="border border-white border-2 mx-2 mb-3 rounded post-grid-post"
              style={{ position: "relative", cursor: "pointer" }}
              onClick={() => navigate(PostUrlFormat(post.category, post.title))}
            >
              <div
                className="rounded"
                style={{
                  position: "absolute",
                  backgroundImage: `url(${post.img})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  filter: "brightness(75%)",
                  width: "100%",
                  top: 0,
                  right: 0,
                  bottom: 0,
                  left: 0,
                  zIndex: 0,
                }}
              ></div>
              <div className="p-4" style={{ position: "relative", zIndex: 1 }}>
                <h4 className="mb-0">{post.title}</h4>
                <p>
                  <span className="bi bi-clock-fill"></span>
                  <span className="ms-1">{FormatDate(post.date)}</span>
                </p>
                <div style={{ textAlign: "justify" }}>
                  {truncate(post.body, 300, { stripTags: true })}
                </div>
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

export default PaginationPostGrid;
