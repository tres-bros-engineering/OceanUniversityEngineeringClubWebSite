import { useLocation, useParams } from "react-router-dom";
import FormatDate from "../../utils/FormatDate";
import { useData } from "../../utils/DataContext";
import NotFound from "./NotFound";
import { Container, Row } from "react-bootstrap";
import Sidebar from "../../components/enduser/sidebar/Sidebar";
import Comment from "../../components/enduser/comment/Comment";
import UseTitleName from "../../utils/UseTitleName";

const Post = () => {
  const { articles, news, comments } = useData();

  const { titleSlug } = useParams();
  const location = useLocation();
  const postId = location.state?.id;

  // Check the title to find post
  const checkPost = articles.find((p) => p.title.toLowerCase().replace(/\s+/g, "-") === titleSlug)
    || news.find((p) => p.title.toLowerCase().replace(/\s+/g, "-") === titleSlug);

  const post = checkPost?.id === postId ? checkPost : null;

  UseTitleName((post?.title) + " | OCU Engineering Club");

  return (
    <>
      {post ? (
        <Container fluid className="p-0 m-0">
          <Row className="p-0 m-0 my-4">
            {/* Post Layout */}
            <div className="col-lg-8 ps-4" data-aos="fade-up">
              <h2>{post.title}</h2>
              <div className="mt-1 fw-bold">
                <span className="me-4"><i className="bi bi-clock"></i> {FormatDate(post.date)}</span>
                <span className="me-4"><i className="bi bi-person-circle"></i> {post.author}</span>
                {post.category ? (<span><i className="bi bi-tags"></i> {post.category}</span>) : (<span><i className="bi bi-tags"></i> News</span>)}
              </div>
              <div className="mt-1 mb-4 fw-bold">
                <span className="me-4"><i className="bi bi-eye"></i> {post.views}</span>
                {post.category && (<span><i className="bi bi-chat-text"></i> {comments.filter((comment) => comment.article_id === post.id).length}</span>)}
              </div>
              <img src={post.img} className="rounded w-100" alt="..." />
              <p className="mt-4" style={{ textAlign: "justify", whiteSpace: "pre-wrap" }}>{post.body}</p>
              {/* Comment Section */}
              {post.category && <div className="mt-5" data-aos="fade-up"><Comment post_id={post.id} /></div>}
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
