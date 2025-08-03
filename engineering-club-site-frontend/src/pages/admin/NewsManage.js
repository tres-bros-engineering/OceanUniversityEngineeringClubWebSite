import { useNavigate } from "react-router-dom";
import { useData } from "../../utils/DataContext";
import UseTitleName from "../../utils/UseTitleName";
import { Container, Row } from "react-bootstrap";
import FormatDate from "../../utils/FormatDate";
import { useState } from "react";
import ApiRoutes from "../../api/ApiRoutes";
import "../../components/admin/search/Search.css";
import Search from "../../components/admin/search/Search";

const NewsManage = () => {
  UseTitleName("News Manage | OCU Engineering Club");
  const { news, getNews } = useData();
  const naviagate = useNavigate();

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
    <>
      <Container
        fluid
        className="p-0 m-0 px-1 pb-5 pt-2"
        data-aos="fade-up"
      >
        <Row className="p-0 m-0 mt-4">
          <h1 className="col-lg col-6">News Manage</h1>
          <div className="col-lg-2 col-6">
            <button
              type="button"
              class="btn btn-primary"
              style={{ backgroundColor: "#00798eff", border: 0, width: 200 }}
              onClick={() => naviagate("/admin/create-news")}
            >
              <span className="me-1">
                <i class="bi bi-plus-circle"></i>
              </span>
              <span>Add News</span>
            </button>
          </div>
          <div className="col-lg-2">
            <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          </div>
        </Row>

        {/* Display success msg */}
        {successMsg && (
          <div class="alert alert-success" role="alert">
            The news has been deleted successfully.
          </div>
        )}

        {/* News Table */}
        <Row className="px-3 pt-3 pb-0 m-0 mt-3 rounded bg-black border border-white table-responsive">
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
                .filter((n) => {
                  return searchTerm.trim() === ""
                    ? n
                    : n.title.toLowerCase().includes(searchTerm)
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
                      <i className="bi bi-eye"></i> {n.views}
                    </td>
                    {n.publish ? <td>Yes</td> : <td>No</td>}
                    <td>
                      <i
                        className="btn bi bi-pencil-square"
                        style={{ border: 0 }}
                        onClick={() => naviagate("/admin/news-manage/" + n.id)}
                      ></i>
                      <i
                        className="btn bi bi-trash3"
                        style={{ border: 0 }}
                        onClick={() => deleteNews(n.id)}
                      ></i>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </Row>
      </Container>
    </>
  );
};

export default NewsManage;
