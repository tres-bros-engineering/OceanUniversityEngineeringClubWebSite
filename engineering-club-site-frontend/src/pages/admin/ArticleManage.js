import UseTitleName from "../../utils/UseTitleName";
import { useData } from "../../utils/DataContext";
import FormatDate from "../../utils/FormatDate";
import { useNavigate } from "react-router-dom";
import ApiRoutes from "../../api/ApiRoutes";
import { useState, useEffect } from "react";
import Search from "../../components/search/AdminSearch";
import { useAuth } from "../../utils/AuthContext";
import "./Admin.css";
import axios from "axios";
import DeleteModal from "../../components/modal/DeleteModal";
import { toast } from 'react-toastify';

const ArticleManage = () => {
  UseTitleName("Article Manage");
  const { articles, getArticle, admin } = useData();
  const auth = useAuth();
  const navigate = useNavigate();

  // Get admin attributes
  const user = admin?.find(
    (a) =>
      a.email === auth.getLocalStorageWithExpiry("admin")?.[2] ||
      a.email === auth.user
  );

  useEffect(() => {
    if (!user) {
      navigate("/admin");
    }
  }, [user, navigate]);

  const [isPending, setIsPending] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");

  // Delete article
  const deleteArticle = async (id) => {
    setIsPending(true);
    await axios
      .delete(ApiRoutes.ARTICLE.DELETE + "/" + id)
      .then((res) => {
        setIsPending(false);
        setIsModalOpen(false);
        getArticle();
        toast.success(res.data?.message);
      })
      .catch((error) => {
        setIsPending(false);
        setIsModalOpen(false);
        toast.error(error.response.data?.message || error.response.data?.error);
      });
  };

  return (
    <div className="container pb-5" data-aos="fade-up">
      <h1 className="mt-4">Manage Article</h1>

      <div className="row mt-3">
        <div className="col-lg d-flex justify-content-end px-3">
          <button
            type="button"
            className="btn btn-primary"
            style={{ backgroundColor: "#00798eff", border: 0, width: 200 }}
            onClick={() => navigate("/admin/create-article")}
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
                Reactions
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
                  <td className="text-start">
                    <div><i className="bi bi-eye-fill"></i> {article.views}</div>
                    <div><i className="bi-hand-thumbs-up-fill"></i> {article.like}</div>
                    <div><i className="bi-hand-thumbs-down-fill"></i> {article.dislike}</div>
                  </td>
                  {article.publish ? <td>Yes</td> : <td>No</td>}
                  <td>
                    <i
                      className="btn bi bi-pencil-square"
                      style={{ border: 0 }}
                      onClick={() =>
                        navigate("/admin/article-manage/" + article.id)
                      }
                    ></i>
                    {/* Article deletion confirmation modal */}
                    <DeleteModal modal_title={article.title} modal_type={"Article"} modal_button_theme={"#00798eff"} modal_id={article.id} modal_delete={deleteArticle} isPending={isPending} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
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