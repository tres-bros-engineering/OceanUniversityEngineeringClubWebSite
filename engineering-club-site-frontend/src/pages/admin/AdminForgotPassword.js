import UseTitleName from "../../utils/UseTitleName";
import logo from "../../assets/logo.png";
import "./Admin.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from 'react-toastify';
import ApiRoutes from "../../api/ApiRoutes";
import { useEffect, useState } from "react";
import OTP from "../../components/modal/OTP";

const AdminForgotPassword = () => {
  UseTitleName("Forgot Password");
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPW, setConfirmPW] = useState("");

  const [errorEmail, setErrorEmail] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);
  const [errorConfirmPW, setErrorConfirmPW] = useState(false);

  const [openOtpModal, setOpenOtpModal] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const [isPending, setIsPending] = useState(false);

  // Clear input fields
  useEffect(() => {
    if (isCompleted === true) {
      setEmail("");
      setPassword("");
      setConfirmPW("");
    }
  }, [isCompleted]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsPending(true);
    setOpenOtpModal(false);
    setIsCompleted(false);

    if (password !== confirmPW) {
      setErrorConfirmPW(true);
      setIsPending(false);
      return;
    }

    await axios
      .post(ApiRoutes.ADMIN.OTP, { email: email })
      .then((res) => {
        toast.success(res.data?.message);
        setOpenOtpModal(true);
      })
      .catch((error) => {
        toast.error(error.response.data?.message || error.response.data?.error);
      })
      .finally(() => {
        setIsPending(false);
      });
  };

  return (
    <div
      className="container d-flex flex-column justify-content-center align-items-center min-vh-100 admin-login text-center"
      data-aos="fade-up"
    >
      <div>
        <img src={logo} alt="logo" />
        <h1>Forgot Password</h1>
      </div>

      {openOtpModal && (
        <OTP
          email={email}
          password={password}
          api={ApiRoutes.ADMIN.RESET}
          modal_theme={"#00798eff"}
          setIsCompleted={setIsCompleted}
        />
      )}

      {/* Forgot password form */}
      <form className="mt-2" onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="d-flex justify-content-start ms-1">
            <i className="bi bi-envelope-fill me-1"></i>Email Address
          </label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onInvalid={(e) => {
              e.preventDefault();
              setErrorEmail(true);
            }}
            onInput={() => {
              setErrorEmail(false);
            }}
            required
          />
          {errorEmail && (
            <label className="text-danger d-flex justify-content-start ms-1">
              <i className="bi bi-exclamation-circle-fill me-1"></i>Please enter
              a valid email address!
            </label>
          )}
        </div>
        <div className="form-group mt-3">
          <label className="d-flex justify-content-start ms-1">
            <i className="bi bi-lock-fill me-1"></i>New Password
          </label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter Your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onInvalid={(e) => {
              e.preventDefault();
              setErrorPassword(true);
            }}
            onInput={() => {
              setErrorPassword(false);
            }}
            required
          />
          {errorPassword && (
            <label className="text-danger d-flex justify-content-start ms-1">
              <i className="bi bi-exclamation-circle-fill me-1"></i>Please enter
              your new password!
            </label>
          )}
        </div>
        <div className="form-group mt-3">
          <label className="d-flex justify-content-start ms-1">
            <i className="bi bi-lock-fill me-1"></i>Confirm Password
          </label>
          <input
            type="password"
            className="form-control"
            placeholder="Confirm Your Password"
            value={confirmPW}
            onChange={(e) => setConfirmPW(e.target.value)}
            onInvalid={(e) => {
              e.preventDefault();
              setErrorConfirmPW(true);
            }}
            onInput={() => {
              setErrorConfirmPW(false);
            }}
            required
          />
          {errorConfirmPW && (
            <label className="text-danger d-flex justify-content-start ms-1">
              <i className="bi bi-exclamation-circle-fill me-1"></i>Please
              Confirm your password!
            </label>
          )}
        </div>
        <div className="d-flex justify-content-center mt-4">
          <button
            type="submit"
            className="btn btn-primary"
            style={{ backgroundColor: "#000000ff", border: 0, width: 200 }}
            disabled={isPending}
          >
            {isPending ? (
              <>
                <span className="me-1">
                  <i className="spinner-border spinner-border-sm"></i>
                </span>
                <span>Reseting...</span>
              </>
            ) : (
              "Reset Password"
            )}
          </button>
        </div>
        <div className="d-flex justify-content-center mt-2 mb-4">
          <button
            type="button"
            className="btn btn-primary"
            style={{ backgroundColor: "#00798eff", border: 0, width: 200 }}
            onClick={() => navigate("/admin")}
          >
            Back to Login
          </button>
        </div>
      </form>
    </div>
  );
};;

export default AdminForgotPassword;
