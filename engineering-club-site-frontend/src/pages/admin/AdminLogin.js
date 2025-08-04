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

  const handleLogin = (e) => {
    e.preventDefault();

    // To find admin
    const user = admin.find((a) => a.email === email && a.password === password);

    if (user) {
      auth.login(user?.name);
      navigate(redirectedPath, { replace: true });
    } else {
      alert("Invalid Login");
    }
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center min-vh-100 admin-login text-center" data-aos="fade-up">
      <div>
        <img src={logo} alt="logo" />
        <h1>Login</h1>
      </div>

      {/* Login form */}
      <form className="mt-2" onSubmit={handleLogin}>
        <div className="form-group">
          <input
            type="email"
            class="form-control"
            id="adminInputEmail"
            placeholder="Enter Your Email"
            onInvalid={(e) => e.target.setCustomValidity('Please enter a valid email')}
            onInput={(e) => e.target.setCustomValidity('')}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
