// This is the end user footer area
import "./Footer.css";
import oculogo from "../../assets/ocu-logo.png";
import clublogo from "../../assets/club-logo.jpg";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { NavLink } from "react-router-dom";

const EndUserFooter = () => {
  {
    /* To get the current year*/
  }
  const currentYear = new Date().getFullYear();

  return (
    <div className="footer">
      <Container fluid className="shadow-lg">
        <Row>
          <div className="col-lg text-center mt-4">
            <img src={clublogo} className="club-logo me-1" alt="club-logo" />
            <a href="https://ocu.ac.lk/" target="_blank">
              <img src={oculogo} className="ocu-logo" alt="ocu-logo" />
            </a>
          </div>
          <div className="col-lg-6 mt-lg-5 mt-2">
            <Navbar expand="lg" className="footer-navbar">
              <Nav className="footer-nav mx-auto">
                <Nav.Link as={NavLink} to="/" className="ms-lg-5">
                  Home
                </Nav.Link>
                <Nav.Link as={NavLink} to="/news" className="mx-lg-5">
                  News
                </Nav.Link>
                <NavDropdown
                  title={
                    <span>
                      Article <i className="bi bi-caret-down-fill fs-6"></i>
                    </span>
                  }
                  drop="up"
                  className="me-lg-5 caret-down"
                >
                  <NavDropdown.Item as={NavLink} to="/article/pumps">
                    Pumps
                  </NavDropdown.Item>
                  <NavDropdown.Divider className="d-none d-lg-block" />
                  <NavDropdown.Item
                    as={NavLink}
                    to="/article/ship-constructions"
                  >
                    Ship Constructions
                  </NavDropdown.Item>
                  <NavDropdown.Divider className="d-none d-lg-block" />
                  <NavDropdown.Item as={NavLink} to="/article/ship-stability">
                    Ship Stability
                  </NavDropdown.Item>
                  <NavDropdown.Divider className="d-none d-lg-block" />
                  <NavDropdown.Item as={NavLink} to="/article/ship-type">
                    Ship Type
                  </NavDropdown.Item>
                  <NavDropdown.Divider className="d-none d-lg-block" />
                  <NavDropdown.Item as={NavLink} to="/article/other">
                    Other
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Navbar>
          </div>
          <div className="col-lg mt-lg-5 text-center">
            <div className="contact-us-text text-white">Contact Us</div>
            <div className="mt-2">
              <a
                href="https://www.facebook.com/p/Engineering-Innovation-Club-Ocean-University-of-Sri-Lanka-100054277611108/"
                target="_blank"
              >
                <i className="bi bi-facebook fs-3 text-white me-5"></i>
              </a>
              <a href="https://www.instagram.com/eic_ocu/" target="_blank">
                <i className="bi bi-instagram fs-3 text-white me-5"></i>
              </a>
              <a
                href="https://lk.linkedin.com/company/engineering-innovation-club-ocean-university-of-sri-lanka"
                target="_blank"
              >
                <i className="bi bi-linkedin fs-3 text-white"></i>
              </a>
            </div>
          </div>
        </Row>
        <Row>
          <div className="text-center text-white mb-1 fst-italic footer-text mt-3 mt-lg-0">
            <div>© {currentYear} - All Rights Reserved</div>
            <div>Design & Development by Tres Bros Website Makers</div>
          </div>
        </Row>
      </Container>
    </div>
  );
};

export default EndUserFooter;
