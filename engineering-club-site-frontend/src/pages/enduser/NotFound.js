import { Container, Row } from "react-bootstrap";
import NotFoundAnimation from "../../utils/animation/NotFoundAnimation";
import UseTitleName from "../../utils/UseTitleName";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  UseTitleName("Page Not Found | OCU Engineering Club");

  const navigate = useNavigate();

  return (
    <Container
      fluid
      className="p-0 m-0 d-flex justify-content-center align-items-center"
      data-aos="fade-up"
      style={{ height: "100vh" }}
    >
      <Row className="p-0 m-0">
        <div className="p-0 col-lg-8">
          <NotFoundAnimation />
        </div>

        <div className="p-0 pe-lg-5 col-lg-4">
          <div className="mx-4 mx-lg-0">
            <h1 className="mb-0">Lost at Sea</h1>
            <div className="divider pt-1 bg-white rounded"></div>
          </div>
          <div className="mt-3">
            <h4 className="mx-4 mx-lg-0">
              Land ho? Nay! This page be swallowed by the sea, never to be seen
              again!
            </h4>
            <div className="d-flex justify-content-center">
              <button
                type="button"
                class="btn btn-light btn-lg mt-2 fw-bold"
                onClick={() => navigate("/")}
              >
                Sail Home
              </button>
            </div>
          </div>
        </div>
      </Row>
    </Container>
  );
}

export default NotFound;
