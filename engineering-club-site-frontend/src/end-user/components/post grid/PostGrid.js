import { Container, Row } from "react-bootstrap";
import FormatDate from "../../../components/FormatDate";
import "./PostGrid.css";

const PostGrid = ({ posts, category }) => {
  return (
    <Container fluid>
      <div>
        <h2 className="mb-0 px-2 text-black bg-white rounded-top d-inline-block">{category}</h2>
        <div className="divider pt-1 bg-white rounded"></div>
      </div>
      <div className="my-3">
        {posts.slice(0, 4).map((post) => (
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
                <span class="bi bi-clock"></span>
                <span className="ms-1">{FormatDate(post.date)}</span>
              </p>
              <p className="text-justify my-1">{post.body.length > 150 ? post.body.slice(0, 150) + "..." : post.body}</p>
              <button type="button" class="btn btn-outline-light btn-sm mt-1">
                <span>Read More</span>
                <span className="bi bi-arrow-right ms-1"></span>
              </button>
            </div>
          </Row>
        ))}
      </div>
    </Container>
  );
};

export default PostGrid;
