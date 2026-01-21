//This post grid is used for home page in both admin and super admin
import { Container, Row } from "react-bootstrap";
import FormatDate from "../../utils/FormatDate";
import "./PostGrid.css";
import { useNavigate } from "react-router-dom";
import NoPostFoundAnimation from "../../utils/animation/NoPostFoundAnimation";
import PostUrlFormat from "../../utils/PostUrlFormat";
import truncate from 'truncate-html'

const AdminPostGrid = ({ posts, category, styleType }) => {
  const navigate = useNavigate();

  return (
    <Container fluid className={styleType}>
      <h2>
        <div className="px-2 text-black bg-white rounded-top d-inline-block">
          {category}
        </div>
        <div className="divider pt-1 bg-white rounded-end"></div>
      </h2>
      <div className="my-3">
        {posts.length > 0 ? (
          posts?.slice(0, 10).map((post, index) => (
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
                  {truncate(post.body, 150, { stripTags: true })}
                </div>
              </div>
            </Row>
          ))
        ) : (
          <>
            <div className="d-flex justify-content-center">
              <NoPostFoundAnimation />
            </div>
            <h4 className="text-center mb-4">No Posts Found!</h4>
          </>
        )}
      </div>
    </Container>
  );
};

export default AdminPostGrid;
