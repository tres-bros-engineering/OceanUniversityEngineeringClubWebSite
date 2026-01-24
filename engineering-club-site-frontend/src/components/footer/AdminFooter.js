// This is the both admin and super admin footer
import "./Footer.css";
import oculogo from "../../assets/ocu-logo.png";
import clublogo from "../../assets/club-logo.jpg";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

const AdminFooter = ({ styleType }) => {
  {
    /* To get the current year*/
  }
  const currentYear = new Date().getFullYear();

  return (
    <div className={styleType}>
      <Container fluid className="shadow-lg">
        <Row>
          <div className="col-lg text-center my-3">
            <img src={clublogo} className="club-logo me-1 me-lg-0" alt="club-logo" />
            <a href="https://ocu.ac.lk/" target="_blank" className="d-lg-none">
              <img src={oculogo} className="ocu-logo" alt="ocu-logo" />
            </a>
          </div>
          <div className="col-lg-6 mb-2 d-flex justify-content-center align-items-end">
            <div className="text-center text-black fst-italic footer-text mt-lg-0">
              <div>© {currentYear} - All Rights Reserved</div>
              <div>Design & Development by <a style={{color: "#000000"}} href="https://www.linkedin.com/in/diniduatapattu/" target="_blank">Dinidu Atapattu</a> & <a style={{color: "#000000"}} href="https://www.linkedin.com/in/lahiru-madhuka/" target="_blank">Lahiru Madhuka</a></div>
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

export default AdminFooter;
