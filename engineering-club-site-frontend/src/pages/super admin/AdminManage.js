import UseTitleName from "../../utils/UseTitleName";
import { useData } from "../../utils/DataContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Search from "../../components/search/AdminSearch";
import "./SuperAdmin.css";
import Axios from 'axios';

const AdminManage = () => {
  UseTitleName("Admin Manage | OCU Engineering Club");
  const { admin, getAdmin } = useData();
  const naviagate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [successMsg, setSuccessMsg] = useState(false);

  // Delete admin
  const deleteAdmin = (id) => {
    
    const data = {"id":id}
    Axios.post('http://localhost:3001/api/deleteadmin',data)
        .then(() => {
            setSuccessMsg(true);
            getAdmin();
            
        })
        .catch(error => {
            console.error('axios error: ', error)
            setSuccessMsg(false);
          })


    
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

      {/* Display success msg */}
      {successMsg && (
        <div className="alert alert-success mt-3 mx-2" role="alert">
          <i className="bi bi-check-circle-fill"></i> The admin has been deleted successfully.
        </div>
      )}

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
                    <i
                      className="btn bi bi-trash3-fill"
                      style={{ border: 0 }}
                      onClick={() => deleteAdmin(a.id)}
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

export default AdminManage;