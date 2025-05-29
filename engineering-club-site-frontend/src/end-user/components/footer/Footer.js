import "./Footer.css";
import oculogo from "../../../assets/ocu-logo.png";
import clublogo from "../../../assets/club-logo.jpg";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { NavLink } from "react-router-dom";

const Footer = () => {
  {
    /* To get the current year*/
  }
  const currentYear = new Date().getFullYear();

  return (
    <div className="footer">
      <Container fluid className="shadow-lg">
        <Row>
          <div className="col-lg text-center mt-4">
            <img src={clublogo} className="club-logo" alt="club-logo" />
            <img src={oculogo} className="ocu-logo" alt="ocu-logo" />
          </div>
          <div className="col-lg-6 mt-lg-5 mt-2">
            <Navbar expand="lg" className="footer-navbar">
              <Nav className="footer-nav mx-auto">
                <Nav.Link as={NavLink} to="/" className="mx-5">
                  Home
                </Nav.Link>
                <Nav.Link as={NavLink} to="/news" className="mx-5">
                  News
                </Nav.Link>
                <NavDropdown
                  title={
                    <span>
                      Article <i className="bi bi-caret-down-fill fs-6"></i>
                    </span>
                  }
                  drop="up"
                  className="mx-5 caret-down"
                >
                  <NavDropdown.Item as={NavLink} to="/pumps">Pumps</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item as={NavLink} to="/ship-constructions">
                    Ship Constructions
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item as={NavLink} to="/ship-stability">
                    Ship Stability
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item as={NavLink} to="/ship-type">Ship Type</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item as={NavLink} to="/other">Other</NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Navbar>
          </div>
          <div className="col-lg mt-lg-5 text-center mt-2">
            <div className="contact-us-text text-white">Contact Us</div>
            <div className="mt-2">
              <a href="https://www.facebook.com/" target="_blank">
                <i className="bi bi-facebook fs-3 text-white me-5"></i>
              </a>
              <a href="#" target="_blank">
                <i className="bi bi-envelope-fill fs-3 text-white me-5"></i>
              </a>
              <a href="#" target="_blank">
                <i className="bi bi-telephone-fill fs-3 text-white"></i>
              </a>
            </div>
          </div>
        </Row>
        <Row>
          <div className="text-center text-white mb-1 fst-italic footer-text mt-3 mt-lg-0">
            <div>
              © {currentYear} - All Rights Reserved
            </div>
            <div>
              Design & Development by Tres Bros Website Makers
            </div>
          </div>
        </Row>
      </Container>
    </div>
  );
};

export default Footer;
