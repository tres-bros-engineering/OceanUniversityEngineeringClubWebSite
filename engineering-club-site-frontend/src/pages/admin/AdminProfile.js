import { useNavigate } from "react-router-dom";
import UseTitleName from "../../utils/UseTitleName";
import { useAuth } from "../../utils/AuthContext";
import { useState } from "react";
import ApiRoutes from "../../api/ApiRoutes";
import { useData } from "../../utils/DataContext";
import "./Admin.css";
import axios from "axios";
import { toast } from "react-toastify";
import { useEffect } from "react";


const AdminProfile = () => {
  UseTitleName("Profile");
  const auth = useAuth();
  const navigate = useNavigate();
  const { admin, getAdmin } = useData();

  // Get admin attributes
  const user = admin?.find(
    (a) =>
      a.email === auth.getLocalStorageWithExpiry("admin")?.[2] ||
      a.email === auth.user
  );

  useEffect(() => {
    if (!user) {
      navigate("/admin");
    }
  }, [user, navigate]);


  const [isPending, setIsPending] = useState(false);

  const [currentPW, setCurrentPW] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPW, setConfirmPW] = useState("");

  const [errorCurrentPW, setErrorCurrentPW] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);
  const [errorConfirmPW, setErrorConfirmPW] = useState(false);

  const handleLogout = () => {
    auth.logout();
    navigate("/admin");
  };

  // Update admin
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsPending(true);

    if (password === confirmPW) {
      const admin = {
        currentPassword: currentPW,
        password: password
      };

      await axios
        .patch(ApiRoutes.ADMIN.PATCH + "/" + user?.id, admin)
        .then((res) => {
          //Current Password Validation taken from database
          if (!res.data?.response) {
            //when current password not matching with previous password
            setErrorCurrentPW(true);
            setIsPending(false);
            toast.error(res.data?.user_message);
          } else {
            // Clear The Input Fields Values
            setCurrentPW("");
            setPassword("");
            setConfirmPW("");
            setErrorCurrentPW(false);
            setErrorConfirmPW(false);

            getAdmin();
            setIsPending(false);
            toast.success(res.data?.user_message);
          }

        })
        .catch((error) => {
          setIsPending(false);
          toast.error(error.response.data?.message || error.response.data?.error);
        });
    } else {
      setErrorConfirmPW(true);
      setIsPending(false);
    }
  };

  return (
    <div className="container pb-5 admin-manage-posts" data-aos="fade-up">
      <div className="mt-4">
        <h1>Profile</h1>
        <div className="d-flex justify-content-end">
          <button
            type="submit"
            className="btn btn-primary"
            style={{ backgroundColor: "#00798eff", border: 0, width: 120 }}
            onClick={handleLogout}
          >
            Logout <i className="bi bi-box-arrow-left"></i>
          </button>
        </div>

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
      <div className="row border border-white border-2 rounded p-3 m-0 mt-3">
        <div className="form-group col-lg-6">
          <label>
            <i className="bi bi-person-fill"></i> Name
          </label>
          <input
            type="text"
            className="form-control"
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
            className="form-control"
            value={user?.email}
            disabled
            readOnly
          />
        </div>
      </div>

      {/* Admin edit password form */}
      <form
        className="mt-3 row border border-white border-2 rounded p-3 m-0"
        onSubmit={handleSubmit}
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
            style={{ backgroundColor: "#000000ff", border: 0, width: 125 }}
            disabled={isPending}
          >
            {isPending ? (
              <>
                <span className="me-1">
                  <i className="spinner-border spinner-border-sm"></i>
                </span>
                <span>Updating...</span>
              </>
            ) : (
              <>
                <span className="me-1">
                  <i className="bi bi-pencil-square"></i>
                </span>
                <span>Update</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminProfile;
