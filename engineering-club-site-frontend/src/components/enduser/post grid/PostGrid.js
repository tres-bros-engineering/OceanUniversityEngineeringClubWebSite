//This post grid is used for home page
import { Container, Row } from "react-bootstrap";
import FormatDate from "../../../utils/FormatDate";
import "./PostGrid.css";
import { useNavigate } from "react-router-dom";
import NoPostFoundAnimation from "../../../utils/animation/NoPostFoundAnimation";

const PostGrid = ({ posts, category }) => {
  const navigate = useNavigate();

  return (
    <Container fluid>
      <h2>
        <div className="px-2 text-black bg-white rounded-top d-inline-block">
          {category}
        </div>
        <div className="divider pt-1 bg-white rounded-end"></div>
      </h2>
      <div className="my-3">
        {posts.length > 0 ? (
          posts.slice(0, 6).map((post) => (
            <Row
              key={post.id}
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
                <p className="my-1" style={{ textAlign: "justify" }}>
                  {post.body.length > 150
                    ? post.body.slice(0, 150) + "..."
                    : post.body}
                </p>
                <button
                  type="button"
                  class="btn btn-outline-light btn-sm mt-1"
                  onClick={() =>
                    navigate(formatUrlPath(post.category, post.title), {
                      state: { id: post.id },
                    })
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
            <h4 className="text-center mb-4">No Post Found!</h4>
          </>
        )}
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

export default PostGrid;
