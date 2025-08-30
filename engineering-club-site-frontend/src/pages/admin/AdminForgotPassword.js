import UseTitleName from "../../utils/UseTitleName";
import logo from "../../assets/logo.png";
import "./Admin.css";
import { useNavigate } from "react-router-dom";

const AdminForgotPassword = () => {
  UseTitleName("Forgot Password | OCU Engineering Club");
  const navigate = useNavigate();

  return (
    <div className="container d-flex flex-column justify-content-center align-items-center min-vh-100 admin-login text-center" data-aos="fade-up">
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
            style={{ backgroundColor: "#00798eff", border: 0, width: 200 }}
            onClick={() => navigate("/admin")}
          >
            Back to Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminForgotPassword;
