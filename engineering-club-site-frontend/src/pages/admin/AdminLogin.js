import UseTitleName from "../../utils/UseTitleName";
import logo from "../../assets/logo.png";
import "./Admin.css";
import { NavLink } from "react-router-dom";

const AdminLogin = () => {
  UseTitleName("Admin Login | OCU Engineering Club");

  return (
    <div className="d-flex flex-column justify-content-center align-items-center min-vh-100 admin-login text-center" data-aos="fade-up">
      <div>
        <img src={logo} alt="logo" />
        <h1>Login</h1>
      </div>

      {/* Login form */}
      <form className="mt-2">
        <div className="form-group">
          <input
            type="email"
            class="form-control"
            id="adminInputEmail"
            placeholder="Enter Your Email"
            onInvalid={(e) => e.target.setCustomValidity('Please enter a valid email')}
            onInput={(e) => e.target.setCustomValidity('')}
            required
          />
        </div>
        <div className="form-group my-3">
          <input
            type="password"
            class="form-control"
            id="adminInputPassword"
            placeholder="Enter Your Password"
            onInvalid={(e) => e.target.setCustomValidity('Please enter a valid password')}
            onInput={(e) => e.target.setCustomValidity('')}
            required
          />
        </div>
        <NavLink to="/admin/forgot-password" className="text-white">Forgot Password?</NavLink>
        <div className="d-flex justify-content-center mt-2">
          <button
            type="submit"
            class="btn btn-primary"
            style={{ backgroundColor: "#000000ff", border: 0, width: 120 }}
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminLogin;
