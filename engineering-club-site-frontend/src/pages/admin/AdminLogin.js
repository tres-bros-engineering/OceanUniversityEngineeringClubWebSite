import UseTitleName from "../../utils/UseTitleName";
import logo from "../../assets/logo.png";
import "./Admin.css";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../utils/AuthContext";
import { useData } from "../../utils/DataContext";

const AdminLogin = () => {
  UseTitleName("Admin Login | OCU Engineering Club");
  const auth = useAuth();
  const { admin } = useData();
  const navigate = useNavigate();
  const location = useLocation();

  const redirectedPath = location.state?.path || "/admin/home";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errorEmail, setErrorEmail] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);

  const [invalidUser, setInvalidUser] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();

    // To find admin
    const user = admin.find((a) => a.email === email && a.password === password);

    if (user) {
      auth.login(user?.name);
      navigate(redirectedPath, { replace: true });
    } else {
      setInvalidUser(true);
    }
  };

  return (
    <div
      className="container d-flex flex-column justify-content-center align-items-center min-vh-100 admin-login text-center"
      data-aos="fade-up"
    >
      {/* Display invalid user msg */}
      {invalidUser && (
        <div class="alert alert-danger" role="alert">
          <i className="bi bi-exclamation-triangle-fill"></i> Invalid login, try
          again!
        </div>
      )}
      <div>
        <img src={logo} alt="logo" />
        <h1>Login</h1>
      </div>

      {/* Login form */}
      <form className="mt-2" onSubmit={handleLogin}>
        <div className="form-group">
          <label className="d-flex justify-content-start ms-1">
            <i className="bi bi-person-fill me-1"></i>Email Address
          </label>
          <input
            type="email"
            class="form-control"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onInvalid={(e) => {
              e.preventDefault();
              setErrorEmail(true);
            }}
            onInput={() => {
              setErrorEmail(false);
              setInvalidUser(false);
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
        <div className="form-group my-3">
          <label className="d-flex justify-content-start ms-1">
            <i className="bi bi-lock-fill me-1"></i>Password
          </label>
          <input
            type="password"
            class="form-control"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onInvalid={(e) => {
              e.preventDefault();
              setErrorPassword(true);
            }}
            onInput={() => {
              setErrorPassword(false);
              setInvalidUser(false);
            }}
            required
          />
          {errorPassword && (
            <label className="text-danger d-flex justify-content-start ms-1">
              <i className="bi bi-exclamation-circle-fill me-1"></i>Please enter
              a valid password!
            </label>
          )}
        </div>
        <NavLink to="/admin/forgot-password" className="text-white">
          Forgot Password?
        </NavLink>
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
