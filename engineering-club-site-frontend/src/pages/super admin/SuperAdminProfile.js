import { useNavigate } from "react-router-dom";
import UseTitleName from "../../utils/UseTitleName";
import { useAuth } from "../../utils/AuthContext";
import { useState } from "react";
import ApiRoutes from "../../api/ApiRoutes";
import { useData } from "../../utils/DataContext";
import "./SuperAdmin.css";

const SuperAdminProfile = () => {
  UseTitleName("Profile | OCU Engineering Club");
  const auth = useAuth();
  const navigate = useNavigate();
  const { superadmin, getSuperAdmin} = useData();

  // Get admin attributes
  const user = superadmin?.find((a) => a.email === auth.user);

  const [name, setName] = useState(user?.name);
  const [email, setEmail] = useState(user?.email);
  const [currentPW, setCurrentPW] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPW, setConfirmPW] = useState("");

  const [errorName, setErrorName] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorCurrentPW, setErrorCurrentPW] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);
  const [errorConfirmPW, setErrorConfirmPW] = useState(false);
  
  const [successMsg, setSuccessMsg] = useState(false);

  const handleLogout = () => {
    auth.logout();
    navigate("/superadmin");
  };

  // Update superadmin
  const handleSubmitDetails = (e) => {
    e.preventDefault();

    const superadmin = {
      name: name,
      email: email
    };

    fetch(ApiRoutes.SUPERADMIN + "/" + user?.id, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(superadmin),
    })
      .then(() => {
        setSuccessMsg(true);
        getSuperAdmin();

        if(superadmin.email !== auth.user) {
          auth.login(superadmin.email);
        }
      })
      .catch((err) => {
        console.log(err.message);
        setSuccessMsg(false);
      });
  };

  const handleSubmitPassword = (e) => {
    e.preventDefault();

    //Current Password Validation
    if (currentPW !== user?.password) {
      setErrorCurrentPW(true);
      return;
    }

    if (password === confirmPW) {
      const superadmin = {
        password: password,
      };

      fetch(ApiRoutes.SUPERADMIN + "/" + user?.id, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(superadmin),
      })
        .then(() => {
          setSuccessMsg(true);
          getSuperAdmin();
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
    <div className="container pb-5 superadmin-manage-posts" data-aos="fade-up">
      <div className="mt-4">
        <h1>Profile</h1>
        <div className="d-flex justify-content-end">
          <button
            type="submit"
            className="btn btn-primary"
            style={{ backgroundColor: "#2200aa", border: 0, width: 120 }}
            onClick={handleLogout}
          >
            Logout <i className="bi bi-box-arrow-left"></i>
          </button>
        </div>
        {/* Display success msg */}
        {successMsg && (
          <div className="alert alert-success mt-3" role="alert">
            <i className="bi bi-check-circle-fill"></i> Your profile has been
            updated successfully.
          </div>
        )}

        {/* Profile icon  */}
        <div className="d-flex flex-row border border-white border-2 rounded p-3 mt-3">
          <div>
            <div
              className={
                "d-flex justify-content-center align-items-center rounded-circle fw-semibold bg-white text-black"
              }
              style={{
                width: "100px",
                height: "100px",
                fontSize: "50px",
              }}
            >
              {user?.name.charAt(0)}
            </div>
          </div>
          <div className="ms-3">
            <h3>Personal Information</h3>
            <h6>Manage your account details and preferences</h6>
          </div>
        </div>
      </div>

      {/* Admin profile form */}
      <form className="row border border-white border-2 rounded p-3 m-0 mt-3" onSubmit={handleSubmitDetails}>
        <h4>Change Personal Information</h4>
        <div className="form-group col-lg-6">
          <label>
            <i className="bi bi-person-fill"></i> Name
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter your name"
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
              your name!
            </label>
          )}
        </div>
        <div className="form-group mt-3 mt-lg-0 col-lg-6">
          <label>
            <i className="bi bi-envelope-fill"></i> Email Address
          </label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter your email address"
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
              your email address!
            </label>
          )}
        </div>
        <div className="d-flex justify-content-end mt-3">
          <button
            type="submit"
            className="btn btn-primary"
            style={{ backgroundColor: "#000000ff", border: 0, width: 120 }}
          >
            Update
          </button>
        </div>
      </form>
      
      {/* Admin edit password form */}
      <form
        className="mt-3 row border border-white border-2 rounded p-3 m-0"
        onSubmit={handleSubmitPassword}
      >
        <h4>Change Password</h4>
        <div className="form-group col-lg-4">
          <label>
            <i className="bi bi-lock-fill"></i> current Password
          </label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter your current password"
            value={currentPW}
            onChange={(e) => setCurrentPW(e.target.value)}
            onInvalid={(e) => {
              e.preventDefault();
              setErrorCurrentPW(true);
            }}
            onInput={() => setErrorCurrentPW(false)}
            required
          />
          {errorCurrentPW && (
            <label className="text-danger">
              <i className="bi bi-exclamation-circle-fill"></i> Please enter
              your current password!
            </label>
          )}
        </div>
        <div className="form-group col-lg-4 mt-3 mt-lg-0">
          <label>
            <i className="bi bi-lock-fill"></i> New Password
          </label>
          <input
            type="password"
            className="form-control"
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
        <div className="form-group col-lg-4 mt-3 mt-lg-0">
          <label>
            <i className="bi bi-lock-fill"></i> Confirm New Password
          </label>
          <input
            type="password"
            className="form-control"
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
        <div className="d-flex justify-content-end mt-3">
          <button
            type="submit"
            className="btn btn-primary"
            style={{ backgroundColor: "#000000ff", border: 0, width: 120 }}
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default SuperAdminProfile;