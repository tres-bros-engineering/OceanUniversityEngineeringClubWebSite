import { useNavigate } from "react-router-dom";
import UseTitleName from "../../utils/UseTitleName";
import { useAuth } from "../../utils/AuthContext";
import { useState } from "react";
import ApiRoutes from "../../api/ApiRoutes";
import { useData } from "../../utils/DataContext";
import "./Admin.css";

const AdminProfile = () => {
  UseTitleName("Profile | OCU Engineering Club");
  const auth = useAuth();
  const navigate = useNavigate();
  const { admin, getAdmin} = useData();

  // Get admin attributes
  const user = admin?.find((a) => a.name === auth.user);

  const [password, setPassword] = useState();
  const [confirmPW, setConfirmPW] = useState();

  const [errorPassword, setErrorPassword] = useState("");
  const [errorConfirmPW, setErrorConfirmPW] = useState("");
  
  const [successMsg, setSuccessMsg] = useState(false);

  const handleLogout = () => {
    auth.logout();
    navigate("/admin");
  };

  // Update admin
  const handleSubmit = (e) => {
    e.preventDefault();

    if (password === confirmPW) {
      const admin = {
        password: password,
      };

      fetch(ApiRoutes.ADMIN + "/" + user?.id, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(admin),
      })
        .then(() => {
          setSuccessMsg(true);
          getAdmin();
        })
        .catch((err) => {
          console.log(err.message);
          setSuccessMsg(false);
        });
    } else {
      setErrorConfirmPW(true);
    }
  };

  return (
    <div className="container pb-5 admin-manage-posts" data-aos="fade-up">
      <div className="mt-4">
        <h1>Profile</h1>
        {/* Display success msg */}
        {successMsg && (
          <div class="alert alert-success" role="alert">
            <i className="bi bi-check-circle-fill"></i> Your profile has been updated
            successfully.
          </div>
        )}
        <div className="d-flex justify-content-end mt-3">
          <button
            type="submit"
            class="btn btn-primary"
            style={{ backgroundColor: "#00798eff", border: 0, width: 120 }}
            onClick={handleLogout}
          >
            Logout <i class="bi bi-box-arrow-left"></i>
          </button>
        </div>
        <div className="d-flex justify-content-center">
          <div
            className={
              "d-flex justify-content-center align-items-center rounded-circle fw-semibold bg-white text-black"
            }
            style={{
              width: "180px",
              height: "180px",
              fontSize: "100px",
            }}
          >
            {auth.user.charAt(0)}
          </div>
        </div>
      </div>
      {/* Admin edit profile form  */}
      <form className="mt-3" onSubmit={handleSubmit}>
        <div className="row">
          <div className="form-group col-lg-6">
            <label>
              <i className="bi bi-person-fill"></i> Name
            </label>
            <input
              type="text"
              class="form-control"
              value={user?.name}
              disabled
              readOnly
            />
          </div>
          <div className="form-group mt-3 mt-lg-0 col-lg-6">
            <label>
              <i className="bi bi-envelope-fill"></i> Email Address
            </label>
            <input
              type="email"
              class="form-control"
              value={user?.email}
              disabled
              readOnly
            />
          </div>
        </div>

        <div className="row">
          <h5 className="mt-4">
            <div className="px-2 text-black bg-white rounded-top d-inline-block">
              Change Password
            </div>
            <div className="divider pt-1 bg-white rounded-end"></div>
          </h5>
          <div className="form-group col-lg-6">
            <label>
              <i className="bi bi-lock-fill"></i> New Password
            </label>
            <input
              type="password"
              class="form-control"
              id="adminPassword"
              placeholder="Enter your new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onInvalid={(e) => {
                e.preventDefault();
                setErrorPassword(true);
              }}
              onInput={() => setErrorPassword(false)}
              required
            />
            {errorPassword && (
              <label className="text-danger">
                <i className="bi bi-exclamation-circle-fill"></i> Please enter
                your new password!
              </label>
            )}
          </div>
          <div className="form-group mb-3 col-lg-6">
            <label>
              <i className="bi bi-lock-fill"></i> Confirm New Password
            </label>
            <input
              type="password"
              class="form-control"
              id="adminConfirmPW"
              placeholder="Confirm your new password"
              value={confirmPW}
              onChange={(e) => setConfirmPW(e.target.value)}
              onInvalid={(e) => {
                e.preventDefault();
                setErrorConfirmPW(true);
              }}
              onInput={() => setErrorConfirmPW(false)}
              required
            />
            {errorConfirmPW && (
              <label className="text-danger">
                <i className="bi bi-exclamation-circle-fill"></i> Please confirm
                your new password!
              </label>
            )}
          </div>
        </div>
        <div className="d-flex justify-content-end mt-2">
          <button
            type="submit"
            class="btn btn-primary"
            style={{ backgroundColor: "#000000ff", border: 0, width: 120 }}
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminProfile;
