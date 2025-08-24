import UseTitleName from "../../utils/UseTitleName";
import logo from "../../assets/logo.png";
import "./SuperAdmin.css";
import { useNavigate } from "react-router-dom";

const SuperAdminForgotPassword = () => {
  UseTitleName("Forgot Password | OCU Engineering Club");
  const navigate = useNavigate();

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
            class="form-control"
            id="adminInputEmail"
            placeholder="Enter Your Email"
            onInvalid={(e) =>
              e.target.setCustomValidity("Please enter a valid email")
            }
            onInput={(e) => e.target.setCustomValidity("")}
            required
          />
        </div>
        <div className="d-flex justify-content-center mt-3">
          <button
            type="submit"
            class="btn btn-primary"
            style={{ backgroundColor: "#000000ff", border: 0, width: 200 }}
          >
            Request Reset Link
          </button>
        </div>
        <div className="d-flex justify-content-center mt-2">
          <button
            type="button"
            class="btn btn-primary"
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
