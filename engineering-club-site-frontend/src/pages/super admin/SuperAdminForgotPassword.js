import UseTitleName from "../../utils/UseTitleName";
import logo from "../../assets/logo.png";
import "./SuperAdmin.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ApiRoutes from "../../api/ApiRoutes";
import axios from "axios";
import { toast } from 'react-toastify';

const SuperAdminForgotPassword = () => {
  UseTitleName("Forgot Password | OCU Engineering Club");
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [errorEmail, setErrorEmail] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios
      .post(ApiRoutes.SUPERADMIN.FORGOT, { email: email })
      .then((res) => {
        toast.success(res.data?.message);
      })
      .catch((error) => {
        toast.error(error.response.data?.message || error.response.data?.error);
      });
  };

  return (
    <div className="container d-flex flex-column justify-content-center align-items-center min-vh-100 superadmin-login text-center" data-aos="fade-up">
      <div>
        <img src={logo} alt="logo" />
        <h1>Forgot Password</h1>
      </div>

      {/* Forgot password form */}
      <form className="mt-2">
        <div className="form-group">
          <input
            type="email"
            className="form-control"
            id="adminInputEmail"
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
        <div className="d-flex justify-content-center mt-3">
          <button
            type="submit"
            className="btn btn-primary"
            style={{ backgroundColor: "#000000ff", border: 0, width: 200 }}
          >
            Request Reset Link
          </button>
        </div>
        <div className="d-flex justify-content-center mt-2">
          <button
            type="button"
            className="btn btn-primary"
            style={{ backgroundColor: "#2200aa", border: 0, width: 200 }}
            onClick={() => navigate("/superadmin")}
          >
            Back to Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default SuperAdminForgotPassword;
