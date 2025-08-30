import { useNavigate, useParams } from "react-router-dom";
import UseTitleName from "../../utils/UseTitleName";
import "./SuperAdmin.css";
import { useState } from "react";
import ApiRoutes from "../../api/ApiRoutes";
import { useData } from "../../utils/DataContext";

const EditAdmin = () => {
  const navigate = useNavigate();
  const { idSlug } = useParams();
  const { admin, getAdmin } = useData();

  // Check id to find the admin
  const a = admin.find((article) => article.id === idSlug);

  UseTitleName(a?.name + " | OCU Engineering Club");

  const [name, setName] = useState(a?.name);
  const [email, setEmail] = useState(a?.email);

  const [errorName, setErrorName] = useState(false);
  const [errorEmail, setErrorEmail] = useState(false);

  // Update admin
  const handleSubmit = (e) => {
    e.preventDefault();

    const admin = {
      name: name,
      email: email
    };

    fetch(ApiRoutes.ADMIN + "/" + idSlug, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(admin),
    })
      .then(() => {
        getAdmin();
        navigate("/superadmin/admin-manage");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <>
      <div className="container my-4 superadmin-manage-posts" data-aos="fade-up">
        <h1>Edit Admin</h1>

        {/* Edit Admin Form */}
        <form className="mt-3" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>
              <i className="bi bi-person-fill"></i> Name
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter admin name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onInvalid={(e) => {
                e.preventDefault();
                setErrorName(true);
              }}
              onInput={() => setErrorName(false)}
              required
            />
            {errorName && (
              <label className="text-danger">
                <i className="bi bi-exclamation-circle-fill"></i> Please enter
                admin name!
              </label>
            )}
          </div>
          <div className="form-group my-3">
            <label>
              <i className="bi bi-envelope-fill"></i> Email Address
            </label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter admin email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onInvalid={(e) => {
                e.preventDefault();
                setErrorEmail(true);
              }}
              onInput={() => setErrorEmail(false)}
              required
            />
            {errorEmail && (
              <label className="text-danger">
                <i className="bi bi-exclamation-circle-fill"></i> Please enter
                admin email address!
              </label>
            )}
          </div>
          <div className="d-flex justify-content-end mt-3">
            <button
              type="button"
              className="btn btn-primary me-2"
              style={{ backgroundColor: "#000000ff", border: 0, width: 120 }}
              onClick={() => navigate("/superadmin/admin-manage")}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              style={{ backgroundColor: "#2200aa", border: 0, width: 120 }}
            >
              <span className="me-1">
                <i className="bi bi-pencil-square"></i>
              </span>
              <span>Update</span>
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditAdmin;
