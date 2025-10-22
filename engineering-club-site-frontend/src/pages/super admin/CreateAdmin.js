import { useNavigate } from "react-router-dom";
import UseTitleName from "../../utils/UseTitleName";
import "./SuperAdmin.css";
import { useState } from "react";
import { useData } from "../../utils/DataContext";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

const CreateAdmin = () => {
  UseTitleName("Create Admin | OCU Engineering Club");
  const navigate = useNavigate();
  const { admin,getAdmin } = useData();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [errorName, setErrorName] = useState(false);
  const [errorEmail, setErrorEmail] = useState(false);

  // Add admin
  const handleSubmit = async (e) => {
    e.preventDefault();

    const admin = {
      id: uuidv4(),
      name: name,
      email: email,
      
    };

    try {
      await axios.post(ApiRoutes.ADMIN.CREATE, admin);

      getAdmin();
      navigate("/superadmin/admin-manage");
    } catch(err) {
      console.log(err.message);
    }
  };

  return (
    <>
      <div className="container my-4 superadmin-manage-posts" data-aos="fade-up">
        <h1>Create Admin</h1>

        {/* Add Admin Form */}
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
                <i className="bi bi-plus-circle"></i>
              </span>
              <span>Add</span>
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default CreateAdmin;
