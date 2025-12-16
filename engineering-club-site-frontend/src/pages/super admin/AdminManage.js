import UseTitleName from "../../utils/UseTitleName";
import { useData } from "../../utils/DataContext";
import { useNavigate } from "react-router-dom";
import ApiRoutes from "../../api/ApiRoutes";
import { useState } from "react";
import Search from "../../components/search/AdminSearch";
import "./SuperAdmin.css";
import axios from "axios";
import DeleteModal from "../../components/modal/DeleteModal";
import { toast } from "react-toastify";

const AdminManage = () => {
  UseTitleName("Admin Manage | OCU Engineering Club");
  const { admin, getAdmin } = useData();
  const naviagate = useNavigate();

  const [isPending, setIsPending] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");

  // Delete admin
  const deleteAdmin = async (id) => {
    setIsPending(true);
    await axios
      .delete(ApiRoutes.ADMIN.DELETE + "/" + id)
      .then((res) => {
        setIsPending(false);
        setIsModalOpen(false);
        getAdmin();
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
      <h1 className="mt-4">Admin Manage</h1>

      <div className="row mt-3">
        <div className="col-lg d-flex justify-content-end px-3">
          <button
            type="button"
            className="btn btn-primary"
            style={{ backgroundColor: "#2200aa", border: 0, width: 200 }}
            onClick={() => naviagate("/superadmin/create-admin")}
          >
            <span className="me-1">
              <i className="bi bi-plus-circle"></i>
            </span>
            <span>Add Admin</span>
          </button>
        </div>
        <div className="col-lg-2 mt-2 mt-lg-0 ps-lg-0">
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} styleType={"search-component-superadmin"} />
        </div>
      </div>

      {/* Admin Table */}
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
                Name
              </th>
              <th
                className="text-white"
                style={{ backgroundColor: "#2200aa" }}
                scope="col"
              >
                Email
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
            {admin
              .filter((a) => {
                return searchTerm.trim() === ""
                  ? a
                  : a.name.toLowerCase().includes(searchTerm) ||
                      a.email.toLowerCase().includes(searchTerm);
              })
              ?.map((a, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td className="text-start">{a.name}</td>
                  <td className="text-start">{a.email}</td>
                  <td>
                    <i
                      className="btn bi bi-pencil-square"
                      style={{ border: 0 }}
                      onClick={() =>
                        naviagate("/superadmin/admin-manage/" + a.id)
                      }
                    ></i>
                    {/* Admin deletion confirmation modal */}
                    <DeleteModal modal_title={a.name} modal_type={"Admin"} modal_button_theme={"#2200aa"} modal_id={a.id} modal_delete={deleteAdmin} isPending={isPending} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminManage;