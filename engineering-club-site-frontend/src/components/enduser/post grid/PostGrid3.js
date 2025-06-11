//This post grid is used for sidebar
import { Container, Row } from "react-bootstrap";
import FormatDate from "../../../utils/FormatDate";
import "./PostGrid.css";
import { useNavigate } from "react-router-dom";

const PostGrid3 = ({ posts, category }) => {
  const navigate = useNavigate();

  return (
    <Container fluid>
      <div>
        <h2 className="mb-0 px-2 text-black bg-white rounded-top d-inline-block">
          {category}
        </h2>
        <div className="divider pt-1 bg-white rounded-end"></div>
      </div>
      <div className="my-3">
        {posts.slice(0, 4).map((post) => (
          <Row
            key={post.id}
            className="border border-white mx-2 mb-3 py-2 rounded post-grid-post"
          >
            <div className="col-lg-5">
              <img src={post.img} className="rounded post-grid-img" alt="..." />
            </div>
            <div className="col-lg-7">
              <h5 className="mb-0">{post.title}</h5>
              <p>
                <span className="bi bi-clock"></span>
                <span className="ms-1">{FormatDate(post.date)}</span>
              </p>
              <button
                type="button"
                class="btn btn-outline-light btn-sm"
                onClick={() =>
                  navigate(formatUrlPath(post.category, post.title))
                }
              >
                <span>Read More</span>
                <span className="bi bi-arrow-right ms-1"></span>
              </button>
            </div>
          </Row>
        ))}
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
};

export default PostGrid3;
