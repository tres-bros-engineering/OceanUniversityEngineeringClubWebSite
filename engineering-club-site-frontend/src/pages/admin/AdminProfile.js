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
          getAdmin();
          navigate("/admin/home");
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  };

  return (
    <div className="container pb-5 admin-manage-posts">
      <div className="mt-4">
        <h1>Profile</h1>
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
      <form className="mt-4" onSubmit={handleSubmit}>
        <div className="row">
          <div className="form-group mt-3 col-lg-6">
            <label>
              <i className="bi bi-person-fill"></i> Name
            </label>
            <input
              type="text"
              class="form-control"
              value={user?.name}
              disabled
            />
          </div>
          <div className="form-group mt-3 col-lg-6">
            <label>
              <i className="bi bi-envelope-fill"></i> Email Address
            </label>
            <input
              type="email"
              class="form-control"
              value={user?.email}
              disabled
            />
          </div>
        </div>

        <div className="row">
          <div className="form-group mt-3 col-lg-6">
            <label>
              <i className="bi bi-lock-fill"></i> Password
            </label>
            <input
              type="password"
              class="form-control"
              id="adminPassword"
              placeholder="Enter Your New Password"
              onInvalid={(e) =>
                e.target.setCustomValidity("Please enter your new password")
              }
              onInput={(e) => e.target.setCustomValidity("")}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-group my-3 col-lg-6">
            <label>
              <i className="bi bi-lock-fill"></i> Confirm Password
            </label>
            <input
              type="password"
              class="form-control"
              id="adminConfirmPW"
              placeholder="Confirm Your Password"
              onInvalid={(e) =>
                e.target.setCustomValidity("Please confirm the password")
              }
              onInput={(e) => e.target.setCustomValidity("")}
              value={confirmPW}
              onChange={(e) => setConfirmPW(e.target.value)}
              required
            />
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
