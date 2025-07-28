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
    <div className="footer-admin">
      <Container fluid className="shadow-lg">
        <Row>
          <div className="col-lg text-center my-3">
            <img src={clublogo} className="club-logo" alt="club-logo" />
            <a href="https://ocu.ac.lk/" target="_blank" className="d-lg-none">
              <img src={oculogo} className="ocu-logo" alt="ocu-logo" />
            </a>
          </div>
          <div className="col-lg-6 mb-2 d-flex justify-content-center align-items-end">
            <div className="text-center text-black fst-italic footer-text mt-lg-0">
              <div>© {currentYear} - All Rights Reserved</div>
              <div>Design & Development by Tres Bros Website Makers</div>
            </div>
          </div>
          <div className="col-lg text-center my-3 d-none d-lg-block">
            <a href="https://ocu.ac.lk/" target="_blank">
              <img src={oculogo} className="ocu-logo" alt="ocu-logo" />
            </a>
          </div>
        </Row>
      </Container>
    </div>
  );
};

export default Footer;
