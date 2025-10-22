// This is the comment section component in end user
import ApiRoutes from "../../api/ApiRoutes";
import { FormatRelevantTime } from "../../utils/FormatDate";
import { useData } from "../../utils/DataContext";
import "./Comment.css";
import { useState } from 'react';
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

const Comment = ({ post_id }) => {
  const { comments, getComment } = useData();

  // Get Input Values from Comment Box
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [body, setBody] = useState("");

  const [errorName, setErrorName] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorBody, setErrorBody] = useState("");

  const [successMsg, setSuccessMsg] = useState(false);

  // Add comment
  const handleSubmit = async (e) => {
    e.preventDefault();

    const comment = {
      id: uuidv4(),
      article_id: post_id,
      date: new Date(),
      name: name,
      email: email,
      comment: body,
    };

    try {
      await axios.post(ApiRoutes.COMMENT.CREATE, comment);

      setSuccessMsg(true);
      getComment();

      // Clear The Input Fields Values
      setName("");
      setEmail("");
      setBody("");
    } catch(err) {
      console.log(err.message);
      setSuccessMsg(false);
    }
  };

  // Filter comments by relevant post id
  const comment = comments.filter((comment) => comment.article_id === post_id);

  return (
    <div className="comment-component">
      {/* Display success msg */}
      {successMsg && (
        <div className="alert alert-success" role="alert">
          <i className="bi bi-check-circle-fill"></i> The comment has been added
          successfully.
        </div>
      )}

      {/* Comment Box */}
      <div>
        <h4>
          <span className="me-2">Share Your Thoughts</span>
          <span>
            <i className="bi bi-chat-text"></i>
          </span>
        </h4>
        <div className="mt-3 px-4">
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="form-group col-lg-6">
                <label>
                  <i className="bi bi-person-fill"></i> Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  onInvalid={(e) => {
                    e.preventDefault();
                    setErrorName(true);
                  }}
                  onInput={() => setErrorName(false)}
                  required
                />
                {errorName && (
                  <label className="text-danger">
                    <i className="bi bi-exclamation-circle-fill"></i> Please enter your
                    name!
                  </label>
                )}
              </div>
              <div className="form-group col-lg-6 mt-3 mt-lg-0">
                <label>
                  <i className="bi bi-envelope-fill"></i> Email Address
                </label>
                <input
                  type="email"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  onInvalid={(e) => {
                    e.preventDefault();
                    setErrorEmail(true);
                  }}
                  onInput={() => setErrorEmail(false)}
                  required
                />
                {errorEmail && (
                  <label className="text-danger">
                    <i className="bi bi-exclamation-circle-fill"></i> Please enter your
                    email address!
                  </label>
                )}
              </div>
            </div>
            <div className="form-group mt-3">
              <label>
                <i className="bi bi-chat-text-fill"></i> Comment
              </label>
              <textarea
                className="form-control"
                rows="3"
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder="Write something..."
                onInvalid={(e) => {
                  e.preventDefault();
                  setErrorBody(true);
                }}
                onInput={() => setErrorBody(false)}
                required
              />
              {errorBody && (
                <label className="text-danger">
                  <i className="bi bi-exclamation-circle-fill"></i> Please enter your
                  comment!
                </label>
              )}
            </div>
            <div className="d-flex justify-content-end">
              <button
                type="submit"
                className="btn btn-primary mt-3 d-flex justify-content-center"
                style={{ backgroundColor: "#f3777b", border: 0 }}
              >
                <span className="me-1">
                  <i className="bi bi-send"></i>
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
          <span className="badge rounded-pill text-bg-light fs-6 mb-2">
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
                      fontSize: "20px",
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
