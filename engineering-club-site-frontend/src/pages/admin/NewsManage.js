import { useNavigate } from "react-router-dom";
import { useData } from "../../utils/DataContext";
import UseTitleName from "../../utils/UseTitleName";
import FormatDate from "../../utils/FormatDate";
import { useState } from "react";
import ApiRoutes from "../../api/ApiRoutes";
import Search from "../../components/search/AdminSearch";
import { useAuth } from "../../utils/AuthContext";
import "./Admin.css";

const NewsManage = () => {
  UseTitleName("News Manage | OCU Engineering Club");
  const { news, getNews, admin } = useData();
  const auth = useAuth();
  const naviagate = useNavigate();

  // Get admin attributes
  const user = admin?.find((a) => a.email === auth.user);

  const [searchTerm, setSearchTerm] = useState("");
  const [successMsg, setSuccessMsg] = useState(false);

  // Delete news
  const deleteNews = (id) => {
    fetch(ApiRoutes.NEWS + "/" + id, {
      method: "DELETE",
    })
      .then(() => {
        setSuccessMsg(true);
        getNews();
      })
      .catch((err) => {
        console.log(err.message);
        setSuccessMsg(false);
      });
  };

  return (
    <div className="container pb-5" data-aos="fade-up">
      <h1 className="mt-4">News Manage</h1>

      <div className="row mt-3">
        <div className="col-lg d-flex justify-content-end px-3">
          <button
            type="button"
            className="btn btn-primary"
            style={{ backgroundColor: "#00798eff", border: 0, width: 200 }}
            onClick={() => naviagate("/admin/create-news")}
          >
            <span className="me-1">
              <i className="bi bi-plus-circle"></i>
            </span>
            <span>Add News</span>
          </button>
        </div>
        <div className="col-lg-2 mt-2 mt-lg-0 ps-lg-0">
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} styleType={"search-component-admin"} />
        </div>
      </div>

      {/* Display success msg */}
      {successMsg && (
        <div className="alert alert-success mt-3 mx-2" role="alert">
          <i className="bi bi-check-circle-fill"></i> The news has been deleted successfully.
        </div>
      )}

      {/* News Table */}
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
            {news
              .filter((n) => n.author === user?.name)
              .filter((n) => {
                return searchTerm.trim() === ""
                  ? n
                  : n.title.toLowerCase().includes(searchTerm);
              })
              .sort((a, b) => new Date(b.date) - new Date(a.date))
              ?.map((n, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                    <img
                      src={n.img}
                      style={{ width: "100px" }}
                      className="rounded"
                    />
                  </td>
                  <td className="text-start">{n.title}</td>
                  <td>{FormatDate(n.date)}</td>
                  <td>
                    <i className="bi bi-eye-fill"></i> {n.views}
                  </td>
                  {n.publish ? <td>Yes</td> : <td>No</td>}
                  <td>
                    <i
                      className="btn bi bi-pencil-square"
                      style={{ border: 0 }}
                      onClick={() => naviagate("/admin/news-manage/" + n.id)}
                    ></i>
                    <i
                      className="btn bi bi-trash3-fill"
                      style={{ border: 0 }}
                      onClick={() => deleteNews(n.id)}
                    ></i>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default NewsManage;
