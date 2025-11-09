import UseTitleName from "../../utils/UseTitleName";
import { useData } from "../../utils/DataContext";
import FormatDate from "../../utils/FormatDate";
import { useNavigate } from "react-router-dom";
import ApiRoutes from "../../api/ApiRoutes";
import { useState } from "react";
import Search from "../../components/search/AdminSearch";
import { useAuth } from "../../utils/AuthContext";
import "./Admin.css";
import axios from "axios";
import DeleteModal from "../../components/modal/DeleteModal";

const ArticleManage = () => {
  UseTitleName("Article Manage | OCU Engineering Club");
  const { articles, getArticle, admin } = useData();
  const auth = useAuth();
  const naviagate = useNavigate();

  // Get admin attributes
  const user = admin?.find((a) => a.email === auth.user);

  const [searchTerm, setSearchTerm] = useState("");
  const [successMsg, setSuccessMsg] = useState(false);

  // Delete article
  const deleteArticle = async (id) => {
    try {
      await axios.delete(ApiRoutes.ARTICLE.DELETE + "/" + id);

      setSuccessMsg(true);
      getArticle();
    } catch(err) {
      console.log(err.message);
      setSuccessMsg(false);
    }
  };

  return (
    <div className="container pb-5" data-aos="fade-up">
      <h1 className="mt-4">Article Manage</h1>

      <div className="row mt-3">
        <div className="col-lg d-flex justify-content-end px-3">
          <button
            type="button"
            className="btn btn-primary"
            style={{ backgroundColor: "#00798eff", border: 0, width: 200 }}
            onClick={() => naviagate("/admin/create-article")}
          >
            <span className="me-1">
              <i className="bi bi-plus-circle"></i>
            </span>
            <span>Add Article</span>
          </button>
        </div>
        <div className="col-lg-2 mt-2 mt-lg-0 ps-lg-0">
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} styleType={"search-component-admin"} />
        </div>
      </div>

      {/* Display success msg */}
      {successMsg && (
        <div className="alert alert-success mt-3 mx-2" role="alert">
          <i className="bi bi-check-circle-fill"></i> The article has been deleted successfully.
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
              .filter((article) => article.admin_id === user?.id)
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
                    <i className="bi bi-eye-fill"></i> {article.views}
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
                    {/* Article deletion confirmation modal */}
                    <DeleteModal modal_title={article.title} modal_type={"Article"} modal_button_theme={"#00798eff"} modal_id={article.id} modal_delete={deleteArticle} />
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