import UseTitleName from "../../utils/UseTitleName";
import { useData } from "../../utils/DataContext";
import FormatDate from "../../utils/FormatDate";
import { useNavigate } from "react-router-dom";
import ApiRoutes from "../../api/ApiRoutes";
import { useState } from "react";
import "../../components/admin/search/Search.css";
import Search from "../../components/admin/search/Search";
import { useAuth } from "../../utils/AuthContext";

const ArticleManage = () => {
  UseTitleName("Article Manage | OCU Engineering Club");
  const { articles, getArticle } = useData();
  const auth = useAuth();
  const naviagate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [successMsg, setSuccessMsg] = useState(false);

  // Delete article
  const deleteArticle = (id) => {
    fetch(ApiRoutes.ARTICLE + "/" + id, {
      method: "DELETE",
    })
      .then(() => {
        setSuccessMsg(true);
        getArticle();
      })
      .catch((err) => {
        console.log(err.message);
        setSuccessMsg(false);
      });
  };

  return (
    <div className="container pb-5" data-aos="fade-up">
      <h1 className="mt-4">Article Manage</h1>

      <div className="row mt-3">
        <div className="col-lg d-flex justify-content-end px-3">
          <button
            type="button"
            class="btn btn-primary"
            style={{ backgroundColor: "#00798eff", border: 0, width: 200 }}
            onClick={() => naviagate("/admin/create-article")}
          >
            <span className="me-1">
              <i class="bi bi-plus-circle"></i>
            </span>
            <span>Add Article</span>
          </button>
        </div>
        <div className="col-lg-2 mt-2 mt-lg-0">
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </div>
      </div>

      {/* Display success msg */}
      {successMsg && (
        <div class="alert alert-success mt-3 mx-2" role="alert">
          The article has been deleted successfully.
        </div>
      )}

      {/* Articles Table */}
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
                Image
              </th>
              <th
                className="text-white"
                style={{ backgroundColor: "#00798eff" }}
                scope="col"
              >
                Title
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
                Category
              </th>
              <th
                className="text-white"
                style={{ backgroundColor: "#00798eff" }}
                scope="col"
              >
                Views
              </th>
              <th
                className="text-white"
                style={{ backgroundColor: "#00798eff" }}
                scope="col"
              >
                Publish
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
            {articles
              .filter((article) => article.author === auth.user)
              .filter((article) => {
                return searchTerm.trim() === ""
                  ? article
                  : article.title.toLowerCase().includes(searchTerm) ||
                      article.category.toLowerCase().includes(searchTerm);
              })
              .sort((a, b) => new Date(b.date) - new Date(a.date))
              ?.map((article, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                    <img
                      src={article.img}
                      style={{ width: "100px" }}
                      className="rounded"
                    />
                  </td>
                  <td className="text-start">{article.title}</td>
                  <td>{FormatDate(article.date)}</td>
                  <td className="text-start">{article.category}</td>
                  <td>
                    <i className="bi bi-eye"></i> {article.views}
                  </td>
                  {article.publish ? <td>Yes</td> : <td>No</td>}
                  <td>
                    <i
                      className="btn bi bi-pencil-square"
                      style={{ border: 0 }}
                      onClick={() =>
                        naviagate("/admin/article-manage/" + article.id)
                      }
                    ></i>
                    <i
                      className="btn bi bi-trash3"
                      style={{ border: 0 }}
                      onClick={() => deleteArticle(article.id)}
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

export default ArticleManage;