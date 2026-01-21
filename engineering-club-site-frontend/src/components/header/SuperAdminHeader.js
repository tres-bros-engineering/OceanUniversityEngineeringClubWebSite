// This is super admin header component
import logo from "../../assets/logo.png";
import "./Header.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../utils/AuthContext";
import { useData } from "../../utils/DataContext";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useEffect } from "react";

const SuperAdminHeader = () => {
  const location = useLocation();
  const { superadmin } = useData();
  const auth = useAuth();
  const navigate = useNavigate();

  // Get superadmin attributes
  const user = superadmin?.find(
        (a) =>
          a.email === auth.getLocalStorageWithExpiry("superadmin")?.[2] ||
          a.email === auth.user
      );

  return (
    <div className="header-superadmin">
      <Navbar expand="lg" className="custom-navbar shadow-lg py-1 px-lg-5">
        <Container fluid>
          <Navbar.Brand as={NavLink} to="/superadmin/home">
            <img src={logo} className="navbar-App-logo" alt="logo" />
          </Navbar.Brand>
          <Navbar.Toggle className="nav-toggle">
            <i className="bi bi-list fs-1 nav-toggle-icon"></i>
          </Navbar.Toggle>
          <Navbar.Collapse>
            <Nav className="my-2 my-lg-0 custom-nav mx-auto">
              <Nav.Link
                as={NavLink}
                to="/superadmin/home"
                className={`ms-lg-5 ${
                  location.pathname === "/superadmin/home" ? "active" : ""
                }`}
              >
                Home
              </Nav.Link>
              <Nav.Link
                as={NavLink}
                to="/superadmin/news-manage"
                className={`ms-lg-5 ${
                  location.pathname === "/superadmin/news-manage" ? "active" : ""
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
                className={`mx-lg-5 caret-down ${
                  location.pathname.startsWith("/superadmin/article-manage") ||
                  location.pathname.startsWith("/superadmin/category-manage")
                    ? "active"
                    : ""
                }`}
              >
                <NavDropdown.Item as={NavLink} to="/superadmin/article-manage">
                  Manage Article
                </NavDropdown.Item>
                <NavDropdown.Divider className="d-none d-lg-block" />
                <NavDropdown.Item as={NavLink} to="/superadmin/category-manage">
                  Manage Category
                </NavDropdown.Item>
              </NavDropdown>
              <Nav.Link
                as={NavLink}
                to="/superadmin/admin-manage"
                className={`me-lg-5 ${
                  location.pathname === "/superadmin/admin-manage" ? "active" : ""
                }`}
              >
                Admin
              </Nav.Link>
              <Nav.Link
                as={NavLink}
                to="/superadmin/profile"
                className={`d-lg-none ${
                  location.pathname === "/superadmin/profile" ? "active" : ""
                }`}
              >
                Profile
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
          <Nav.Link
            as={NavLink}
            to="/superadmin/profile"
            className={`d-none d-lg-block ${
              location.pathname === "/superadmin/profile" ? "active" : ""
            }`}
          >
            <div className="d-inline-block">
              <div
                className={`d-flex justify-content-center align-items-center rounded-circle fw-semibold text-white profile-icon
                  ${location.pathname === "/superadmin/profile" ? "active" : ""}`}
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

export default SuperAdminHeader;
