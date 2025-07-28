import logo from "../../../assets/logo.png";
import "./Header.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink, useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();

  return (
    <div className="header-admin">
      <Navbar expand="lg" className="custom-navbar shadow-lg py-1 px-lg-5">
        <Container fluid>
          <Navbar.Brand as={NavLink} to="/admin/home">
            <img src={logo} className="navbar-App-logo me-lg-5" alt="logo" />
          </Navbar.Brand>
          <Navbar.Toggle className="nav-toggle">
            <i className="bi bi-list fs-1 nav-toggle-icon"></i>
          </Navbar.Toggle>
          <Navbar.Collapse>
            <Nav className="my-2 my-lg-0 custom-nav mx-auto">
              <Nav.Link
                as={NavLink}
                to="/admin/home"
                className={`mx-5 ${
                  location.pathname === "/admin" ? "active" : ""
                }`}
              >
                Home
              </Nav.Link>
              <Nav.Link
                as={NavLink}
                to="/admin/article-manage"
                className={`mx-5 ${
                  location.pathname === "/admin/article-manage" ? "active" : ""
                }`}
              >
                Article Manage
              </Nav.Link>
              <Nav.Link
                as={NavLink}
                to="/admin/news-manage"
                className={`mx-5 ${
                  location.pathname === "/admin/news-manage" ? "active" : ""
                }`}
              >
                News Manage
              </Nav.Link>
              <Nav.Link
                as={NavLink}
                to="/admin/profile"
                className={`mx-5 d-lg-none ${
                  location.pathname === "/admin/profile" ? "active" : ""
                }`}
              >
                Profile
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
          <Nav.Link
            as={NavLink}
            to="/admin/profile"
            className={`mx-5 d-none d-lg-block ${
              location.pathname === "/admin/profile" ? "active" : ""
            }`}
          >
            <i className="bi bi-person-circle fs-1"></i>
          </Nav.Link>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;
