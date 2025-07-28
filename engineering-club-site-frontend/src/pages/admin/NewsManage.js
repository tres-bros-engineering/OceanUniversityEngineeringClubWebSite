import { useNavigate } from "react-router-dom";
import { useData } from "../../utils/DataContext";
import UseTitleName from "../../utils/UseTitleName";
import { Container, Row } from "react-bootstrap";
import Search from "../../components/admin/search/Search";
import FormatDate from "../../utils/FormatDate";

const NewsManage = () => {
  UseTitleName("News Manage | OCU Engineering Club");
  const { news } = useData();
  const naviagate = useNavigate();

  return (
    <>
      <Container fluid className="p-0 m-0 px-1 px-lg-5" data-aos="fade-up">
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
            <Search url={"/admin/news-manage"} />
          </div>
        </Row>
        <Row className="px-3 pt-3 pb-0 m-0 mt-3 rounded bg-black border border-white">
          <table className="table table-bordered border-black rounded overflow-hidden text-center">
            <thead>
              <tr>
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
                .sort((a, b) => new Date(b.date) - new Date(a.date))
                ?.map((n, index) => (
                  <tr key={index}>
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
                        onClick={() =>
                          naviagate("/admin/news-manage/" + n.id)
                        }
                      ></i>
                      <i className="btn bi bi-trash3" style={{ border: 0 }}></i>
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
