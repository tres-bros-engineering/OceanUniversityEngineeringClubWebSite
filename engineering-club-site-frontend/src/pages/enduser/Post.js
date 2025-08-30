import { useParams } from "react-router-dom";
import FormatDate from "../../utils/FormatDate";
import NotFound from "./NotFound";
import Sidebar from "../../components/sidebar/Sidebar";
import Comment from "../../components/comment/Comment";
import UseTitleName from "../../utils/UseTitleName";
import { useData } from "../../utils/DataContext";
import "./EndUser.css";
import parse from 'html-react-parser';

const Post = () => {
  const { titleSlug } = useParams();
  const { articles, news, comments } = useData();

  // Check the title to find post
  const post = articles.find((p) => p.title.toLowerCase().replace(/[^\p{L}\p{N}\s]+/gu, "").replace(/\s+/g, "-") === titleSlug)
    || news.find((p) => p.title.toLowerCase().replace(/[^\p{L}\p{N}\s]+/gu, "").replace(/\s+/g, "-") === titleSlug);

  UseTitleName(post?.title + " | OCU Engineering Club");
  
  return (
    <>
      {post?.publish && post ? (
        <div className="container pb-2">
          <div className="row my-4">
            {/* Post Layout */}
            <div className="col-lg-8 ps-4" data-aos="fade-up">
              <h2>{post.title}</h2>
              <div className="mt-1 fw-bold">
                <span className="me-4"><i className="bi bi-clock-fill"></i> {FormatDate(post.date)}</span>
                {/* Profile icon */}
                <div className="d-inline-block">
                  <div
                    className="d-flex justify-content-center align-items-center rounded-circle text-black fw-semibold bg-white"
                    style={{
                      width: "20px",
                      height: "20px",
                      fontSize: "14px"
                    }}
                  >
                    {post.author.charAt(0)}
                  </div>
                </div>
                <span className="me-4"> {post.author}</span>
                {post.category ? (<span><i className="bi bi-tags-fill"></i> {post.category}</span>) : (<span><i className="bi bi-tags"></i> News</span>)}
              </div>
              <div className="mt-1 mb-4 fw-bold">
                <span className="me-4"><i className="bi bi-eye-fill"></i> {post.views}</span>
                {post.category && (<span><i className="bi bi-chat-text-fill"></i> {comments.filter((comment) => comment.article_id === post.id).length}</span>)}
              </div>
              <div className="mt-4 rich-text-display">{parse(post.body)}</div>
              {/* Comment Section */}
              {post.category && <div className="mt-5" data-aos="fade-up"><Comment post_id={post.id} /></div>}
            </div>

            {/* Sidebar */}
            <div className="col-lg-4">
              <Sidebar />
            </div>
          </div>
        </div>
      ) : (
        <NotFound />
      )}
    </>
  );
};

export default Post;
