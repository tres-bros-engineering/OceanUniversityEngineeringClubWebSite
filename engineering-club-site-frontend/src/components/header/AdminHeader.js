// This is admin header component
import logo from "../../assets/logo.png";
import "./Header.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../utils/AuthContext";
import { useData } from "../../utils/DataContext";
import { useEffect } from "react";
import NavDropdown from "react-bootstrap/NavDropdown";

const AdminHeader = () => {
  const location = useLocation();
  const { admin } = useData();
  const auth = useAuth();

  // Get admin attributes
  const user = admin?.find(
    (a) =>
      a.email === auth.getLocalStorageWithExpiry("admin")?.[2] ||
      a.email === auth.user
  );

  return (
    <div className="header-admin">
      <Navbar expand="lg" className="custom-navbar shadow-lg py-1 px-lg-5">
        <Container fluid>
          <Navbar.Brand as={NavLink} to="/admin/home">
            <img src={logo} className="navbar-App-logo" alt="logo" />
          </Navbar.Brand>
          <Navbar.Toggle className="nav-toggle">
            <i className="bi bi-list fs-1 nav-toggle-icon"></i>
          </Navbar.Toggle>
          <Navbar.Collapse>
            <Nav className="my-2 my-lg-0 custom-nav mx-auto">
              <Nav.Link
                as={NavLink}
                to="/admin/home"
                className={`ms-lg-5 ${location.pathname === "/admin/home" ? "active" : ""
                  }`}
              >
                Home
              </Nav.Link>
              <Nav.Link
                as={NavLink}
                to="/admin/news-manage"
                className={`mx-lg-5 ${location.pathname === "/admin/news-manage" ? "active" : ""
                  }`}
              >
                News
              </Nav.Link>
              <NavDropdown
                title={
                  <span>
                    Article <i className="bi bi-caret-down-fill fs-6"></i>
                  </span>
                }
                id="navbarScrollingDropdown"
                className={`me-lg-5 caret-down ${
                  location.pathname.startsWith("/admin/article-manage") || 
                  location.pathname.startsWith("/admin/comment-manage")
                    ? "active"
                    : ""
                }`}
              >
                <NavDropdown.Item as={NavLink} to="/admin/article-manage">
                  Manage Article
                </NavDropdown.Item>
                <NavDropdown.Divider className="d-none d-lg-block" />
                <NavDropdown.Item as={NavLink} to="/admin/comment-manage">
                  Manage Comment
                </NavDropdown.Item>
              </NavDropdown>
              <Nav.Link
                as={NavLink}
                to="/admin/profile"
                className={`d-lg-none ${location.pathname === "/admin/profile" ? "active" : ""
                  }`}
              >
                Profile
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
          <Nav.Link
            as={NavLink}
            to="/admin/profile"
            className={`d-none d-lg-block ${location.pathname === "/admin/profile" ? "active" : ""
              }`}
          >
            <div className="d-inline-block">
              <div
                className={`d-flex justify-content-center align-items-center rounded-circle fw-semibold text-white profile-icon
                  ${location.pathname === "/admin/profile" ? "active" : ""}`}
                style={{
                  width: "40px",
                  height: "40px",
                  fontSize: "20px",
                }}
              >
                {user?.name.charAt(0)}
              </div>
            </div>
          </Nav.Link>
        </Container>
      </Navbar>
    </div>
  );
};

export default AdminHeader;
