import { useLocation, useParams } from "react-router-dom";
import FormatDate from "../../utils/FormatDate";
import posts from "../../data/db.json";
import NotFound from "./NotFound";
import { Container, Row } from "react-bootstrap";
import Sidebar from "../../components/enduser/sidebar/Sidebar";

const Post = () => {
  const { titleSlug } = useParams();
  const location = useLocation();
  const postId = location.state?.id;

  // Fallback logic to find post
  const post = postId
    ? [...posts.article, ...posts.news].find((p) => p.id === postId)
    : [...posts.article, ...posts.news].find(
        (p) => p.title.toLowerCase().replace(/\s+/g, "-") === titleSlug
      );

  return (
    <>
      {post ? (
        <Container fluid className="p-0 m-0">
          <Row className="p-0 m-0 my-4">
            {/* Post Layout */}
            <div className="col-lg-8 ps-4" data-aos="fade-up">
              <h2>{post.title}</h2>
              <div className="mt-1 mb-4 fw-bold">
                <span className="me-4"><i className="bi bi-clock"></i> {FormatDate(post.date)}</span>
                <span className="me-4"><i className="bi bi-hand-thumbs-up"></i> {post.like}</span>
                <span className="me-4"><i className="bi bi-hand-thumbs-down"></i> {post.dislike}</span>
                <span className="me-4"><i className="bi bi-person-circle"></i> {post.author}</span>
              </div>
              <img src={post.img} className="rounded w-100" alt="..." />
              <p className="mt-4" style={{ textAlign: "justify", whiteSpace: "pre-wrap" }}>{post.body}</p>
            </div>

            {/* Sidebar */}
            <div className="col-lg-4">
              <Sidebar />
            </div>
          </Row>
        </Container>
      ) : (
        <NotFound />
      )}
    </>
  );
};

export default Post;
