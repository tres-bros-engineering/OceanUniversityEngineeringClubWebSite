import UseTitleName from "../../utils/UseTitleName";
import logo from "../../assets/logo.png";
import "./Admin.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "../../utils/AuthContext";
import { useData } from "../../utils/DataContext";

const AdminLogin = () => {
  UseTitleName("Admin Login");
  const auth = useAuth();
  const { admin } = useData();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errorEmail, setErrorEmail] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);

  const [isPending, setIsPending] = useState(false);

  // Get admin attributes
  const isuser = admin?.find(
    (a) =>
      a.email === auth.getLocalStorageWithExpiry("admin")?.[2] ||
      a.email === auth.user
  );

  useEffect(() => {
    if (isuser) {
      navigate("/admin/home");
    }
  }, [isuser, navigate]);

  const handleLogin = (e) => {
    e.preventDefault();
    setIsPending(true);

    // set user as input
    const user = {
      email: email,
      password: password
    }
    //check admin in database
    auth.adminlogin(user);
    setTimeout(() => {
      setIsPending(false);
    }, 5000);

  };

  return (
    <div
      className="container d-flex flex-column justify-content-center align-items-center min-vh-100 admin-login text-center"
      data-aos="fade-up"
    >
      <div>
        <img src={logo} alt="logo" />
        <h1>Login</h1>
      </div>

      {/* Login form */}
      <form className="mt-2" onSubmit={handleLogin}>
        <div className="form-group">
          <label className="d-flex justify-content-start ms-1">
            <i className="bi bi-envelope-fill me-1"></i>Email Address
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
        <div className="form-group my-3">
          <label className="d-flex justify-content-start ms-1">
            <i className="bi bi-lock-fill me-1"></i>Password
          </label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter your password"
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
            className="btn btn-primary"
            style={{ backgroundColor: "#000000ff", border: 0, width: 120 }}
            disabled={isPending}
          >
            {isPending ? (
              <>
                <span className="me-1">
                  <i className="spinner-border spinner-border-sm"></i>
                </span>
                <span>Logining...</span>
              </>
            ) : (
              <>
                <span>Login</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminLogin;
