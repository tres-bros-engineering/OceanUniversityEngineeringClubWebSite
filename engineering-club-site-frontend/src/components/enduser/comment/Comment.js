import ApiRoutes from "../../../api/ApiRoutes";
import { FormatRelevantTime } from "../../../utils/FormatDate";
import { useData } from "../../../utils/DataContext";
import "./Comment.css";
import { useState } from 'react';

const Comment = ({ post_id }) => {
  const { comments, getComment } = useData();

  // Get Input Values from Comment Box
  const [commentName, setCommentName] = useState("");
  const [commentEmail, setCommentEmail] = useState("");
  const [commentBody, setCommentBody] = useState("");

  const [successMsg, setSuccessMsg] = useState(false);

  // Add comment
  const handleSubmit = (e) => {
    e.preventDefault();

    const comment = {
      article_id: post_id,
      date: new Date(),
      name: commentName,
      email: commentEmail,
      comment: commentBody,
    };

    fetch(ApiRoutes.COMMENT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(comment),
    })
      .then(() => {
        setSuccessMsg(true);
        getComment();

        // Clear The Input Fields Values
        setCommentName("");
        setCommentEmail("");
        setCommentBody("");
      })
      .catch((err) => {
        console.log(err.message);
        setSuccessMsg(false);
      });
  };

  // Filter comments by relevant post id
  const comment = comments.filter((comment) => comment.article_id === post_id);

  return (
    <div className="comment-component">
      {/* Display success msg */}
      {successMsg && (
        <div class="alert alert-success" role="alert">
          The comment has been added successfully.
        </div>
      )}

      {/* Comment Box */}
      <div>
        <h4>
          <span className="me-2">Share Your Thoughts</span>
          <span>
            <i class="bi bi-chat-text"></i>
          </span>
        </h4>
        <div className="mt-3 px-4">
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div class="form-group col-lg-6">
                <input
                  type="text"
                  class="form-control"
                  id="formCommentName"
                  value={commentName}
                  onChange={(e) => setCommentName(e.target.value)}
                  placeholder="Enter Your Name"
                  onInvalid={(e) => e.target.setCustomValidity('Please enter your name')}
                  onInput={(e) => e.target.setCustomValidity('')}
                  required
                />
              </div>
              <div class="form-group col-lg-6 mt-3 mt-lg-0">
                <input
                  type="email"
                  class="form-control"
                  id="formCommentEmail"
                  value={commentEmail}
                  onChange={(e) => setCommentEmail(e.target.value)}
                  placeholder="Enter Your Email"
                  onInvalid={(e) => e.target.setCustomValidity('Please enter your email')}
                  onInput={(e) => e.target.setCustomValidity('')}
                  required
                />
              </div>
            </div>
            <div class="form-group mt-3">
              <textarea
                class="form-control"
                id="formCommentBody"
                rows="3"
                value={commentBody}
                onChange={(e) => setCommentBody(e.target.value)}
                placeholder="Enter Your Comment..."
                onInvalid={(e) => e.target.setCustomValidity('Please enter your comment')}
                onInput={(e) => e.target.setCustomValidity('')}
                required
              />
            </div>
            <div className="d-flex justify-content-end">
              <button
                type="submit"
                class="btn btn-primary mt-3 d-flex justify-content-center"
                style={{ backgroundColor: "#f3777b", border: 0 }}
              >
                <span className="me-1">
                  <i class="bi bi-send"></i>
                </span>
                <span>Post Comment</span>
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Comments */}
      <div className="my-3">
        <h4>
          Comments{" "}
          <span class="badge rounded-pill text-bg-light fs-6 mb-2">
            {comment.length}
          </span>
        </h4>
        {comment.length > 0 ? (
          comment
            ?.sort((a, b) => new Date(b.date) - new Date(a.date))
            .map((comment) => (
              <div className="mt-2 ms-4" key={comment.id}>
                <div className="d-inline-block align-top me-3">
                  <div
                    className="d-flex justify-content-center align-items-center rounded-circle text-black fw-semibold bg-white"
                    style={{
                      width: "40px",
                      height: "40px",
                    }}
                  >
                    {comment.name.charAt(0)}
                  </div>
                </div>
                <div className="d-inline-block">
                  <h6>
                    <span className="me-4">{comment.name}</span>
                    <span>{FormatRelevantTime(comment.date)}</span>
                    <div>{comment.email}</div>
                  </h6>
                  <p>{comment.comment}</p>
                </div>
              </div>
            ))
        ) : (
          <h6>No comments yet. Be the first to share your thoughts!</h6>
        )}
      </div>
    </div>
  );
};

export default Comment;
