import { useData } from "../../utils/DataContext";
import UseTitleName from "../../utils/UseTitleName";
import FormatDate from "../../utils/FormatDate";
import { useState } from "react";
import ApiRoutes from "../../api/ApiRoutes";
import Search from "../../components/search/AdminSearch";
import "./SuperAdmin.css";
import axios from "axios";
import DeleteModal from "../../components/modal/DeleteModal";

const SuperAdminNewsManage = () => {
  UseTitleName("News Manage | OCU Engineering Club");
  const { news, getNews, admin } = useData();

  const [isPending, setIsPending] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
  const [successMsg, setSuccessMsg] = useState(false);

  // Delete news
  const deleteNews = async (id) => {
    try {
      setIsPending(true);
      await axios.delete(ApiRoutes.NEWS.DELETE + "/" + id);
      setIsPending(false);
      setIsModalOpen(false);
      setSuccessMsg(true);

      getNews();
    } catch (err) {
      console.log(err.message);
      setIsPending(false);
      setIsModalOpen(false);
      setSuccessMsg(false);
    }
  };

  return (
    <div className="container pb-5" data-aos="fade-up">
      <h1 className="mt-4">News Manage</h1>

      <div className="row mt-3 d-lg-flex justify-content-end">
        <div className="col-lg-2 ps-lg-0">
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} styleType={"search-component-superadmin"} />
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
                style={{ backgroundColor: "#2200aa" }}
                scope="col"
              >
                No.
              </th>
              <th
                className="text-white"
                style={{ backgroundColor: "#2200aa" }}
                scope="col"
              >
                Image
              </th>
              <th
                className="text-white"
                style={{ backgroundColor: "#2200aa" }}
                scope="col"
              >
                Title
              </th>
              <th
                className="text-white"
                style={{ backgroundColor: "#2200aa" }}
                scope="col"
              >
                Date
              </th>
              <th
                className="text-white"
                style={{ backgroundColor: "#2200aa" }}
                scope="col"
              >
                Author
              </th>
              <th
                className="text-white"
                style={{ backgroundColor: "#2200aa" }}
                scope="col"
              >
                Views
              </th>
              <th
                className="text-white"
                style={{ backgroundColor: "#2200aa" }}
                scope="col"
              >
                Publish
              </th>
              <th
                className="text-white"
                style={{ backgroundColor: "#2200aa" }}
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
                  <td>{admin.find((a) => a?.id === n.admin_id)?.name}</td>
                  <td>
                    <i className="bi bi-eye-fill"></i> {n.views}
                  </td>
                  {n.publish ? <td>Yes</td> : <td>No</td>}
                  <td>
                    {/* News deletion confirmation modal */}
                    <DeleteModal modal_title={n.title} modal_type={"News"} modal_button_theme={"#2200aa"} modal_id={n.id} modal_delete={deleteNews} isPending={isPending} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SuperAdminNewsManage;
