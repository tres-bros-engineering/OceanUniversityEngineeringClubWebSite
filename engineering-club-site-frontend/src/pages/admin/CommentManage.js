import UseTitleName from "../../utils/UseTitleName";
import { useData } from "../../utils/DataContext";
import FormatDate from "../../utils/FormatDate";
import ApiRoutes from "../../api/ApiRoutes";
import { useState } from "react";
import "../../components/admin/search/Search.css";
import Search from "../../components/admin/search/Search";
import { useAuth } from "../../utils/AuthContext";

const CommentManage = () => {
  UseTitleName("Comment Manage | OCU Engineering Club");
  const { articles, comments, getComment } = useData();
  const auth = useAuth();

  const [searchTerm, setSearchTerm] = useState("");
  const [successMsg, setSuccessMsg] = useState(false);

  // Delete comment
  const deleteComment = (id) => {
    fetch(ApiRoutes.COMMENT + "/" + id, {
      method: "DELETE",
    })
      .then(() => {
        setSuccessMsg(true);
        getComment();
      })
      .catch((err) => {
        console.log(err.message);
        setSuccessMsg(false);
      });
  };

  return (
    <div className="container pb-5" data-aos="fade-up">
      <h1 className="mt-4">Comment Manage</h1>
      <div className="mt-3 d-lg-flex justify-content-end">
        <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </div>

      {/* Display success msg */}
      {successMsg && (
        <div class="alert alert-success mt-3 mx-2" role="alert">
          The comment has been deleted successfully.
        </div>
      )}

      {/* Comments Table */}
      <div className="row px-3 pt-3 mx-2 mt-3 rounded bg-black border border-white table-responsive">
        <table className="table table-bordered border-black rounded overflow-hidden text-center">
          <thead>
            <tr>
              <th
                className="text-white"
                style={{ backgroundColor: "#00798eff" }}
                scope="col"
              >
                No.
              </th>
              <th
                className="text-white"
                style={{ backgroundColor: "#00798eff" }}
                scope="col"
              >
                Article Title
              </th>
              <th
                className="text-white"
                style={{ backgroundColor: "#00798eff" }}
                scope="col"
              >
                Date
              </th>
              <th
                className="text-white"
                style={{ backgroundColor: "#00798eff" }}
                scope="col"
              >
                Name
              </th>
              <th
                className="text-white"
                style={{ backgroundColor: "#00798eff" }}
                scope="col"
              >
                Email
              </th>
              <th
                className="text-white"
                style={{ backgroundColor: "#00798eff" }}
                scope="col"
              >
                Comment
              </th>
              <th
                className="text-white"
                style={{ backgroundColor: "#00798eff" }}
                scope="col"
              >
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {comments
              .filter((comment) =>
                articles
                  .filter((article) => article.author === auth.user)
                  .map((article) => article.id)
                  .includes(comment.article_id)
              )
              .filter((comment) => {
                return searchTerm.trim() === ""
                  ? comment
                  : comment.name.toLowerCase().includes(searchTerm) ||
                      comment.email.toLowerCase().includes(searchTerm) ||
                      articles
                        .find((article) => article.id === comment.article_id)
                        ?.title.toLowerCase()
                        .includes(searchTerm);
              })
              .sort((a, b) => new Date(b.date) - new Date(a.date))
              ?.map((comment, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td className="text-start">
                    {
                      articles.find(
                        (article) => article.id === comment.article_id
                      )?.title
                    }
                  </td>
                  <td>{FormatDate(comment.date)}</td>
                  <td className="text-start">{comment.name}</td>
                  <td className="text-start">{comment.email}</td>
                  <td className="text-start">{comment.comment}</td>
                  <td>
                    <i
                      className="btn bi bi-trash3"
                      style={{ border: 0 }}
                      onClick={() => deleteComment(comment.id)}
                    ></i>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CommentManage;