import { useData } from "../../../utils/DataContext";
import FormatDate from "../../../utils/FormatDate";
import "./Comment.css";

const Comment = ({ post_id }) => {
  const { comments } = useData();

  // Filter comments by relevant post id
  const comment = comments.filter((comment) => comment.article_id === post_id);

  return (
    <div>
      {/* Comments */}
      <h4>
        Comments{" "}
        <span class="badge rounded-pill text-bg-light fs-6">
          {comment.length}
        </span>
      </h4>
      {(comment.length === 0) && <h6>No comments yet. Be the first to share your thoughts!</h6>}
      {comment
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .map((comment) => (
          <div className="mt-2 row" key={comment.id}>
            <div className="col-2 col-lg-1 ps-5">
              <i className="bi bi-person-circle fs-2"></i>
            </div>
            <div className="col-10 col-lg-11">
              <h6 className="pt-1">
                <span className="me-4">{comment.name}</span>
                <span>{FormatDate(comment.date)}</span>
                <div>{comment.email}</div>
              </h6>
              <p>{comment.comment}</p>
            </div>
          </div>
        ))}
        
      {/* Comment Box */}
      <div className="mt-3 px-4">
        <form>
          <div className="row">
            <div class="form-group col-lg-6">
              <input
                type="text"
                class="form-control"
                id="formControlName"
                placeholder="Enter Your Name"
              />
            </div>
            <div class="form-group col-lg-6 mt-3 mt-lg-0">
              <input
                type="email"
                class="form-control"
                id="formControlEmail"
                placeholder="Enter Your Email"
              />
            </div>
          </div>
          <div class="form-group mt-3">
            <textarea
              class="form-control"
              id="formControlComment"
              rows="3"
              placeholder="Enter Your Comment..."
            ></textarea>
          </div>
          <div className="d-flex justify-content-end">
            <button
              type="submit"
              class="btn btn-primary mt-3 d-flex justify-content-center"
              style={{ backgroundColor: "#f3777b", border: 0 }}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Comment;
