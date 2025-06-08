import { Container, Row } from "react-bootstrap";
import PostGrid3 from "../post grid/PostGrid3";
import posts from "../../../PostData.json";

const Sidebar = () => {
  return (
    <Container fluid className="p-0 m-0 d-none d-lg-block">
      <div data-aos="fade-up">
        <PostGrid3 posts={posts} category={"Popular Post"} />
      </div>
      <div className="mt-5" data-aos="fade-up">
        <PostGrid3 posts={posts} category={"Latest Post"} />
      </div>
      <div className="mt-5 container-fluid" data-aos="fade-up">
        <h2 className="mb-0 px-2 text-black bg-white rounded-top d-inline-block">
          Follow Us
        </h2>
        <div className="divider pt-1 bg-white rounded-end"></div>
        <div className="text-center my-3">
          <a
            href="https://www.facebook.com/p/Engineering-Innovation-Club-Ocean-University-of-Sri-Lanka-100054277611108/"
            target="_blank"
          >
            <i className="bi bi-facebook fs-1 text-white me-4"></i>
          </a>
          <a href="https://www.instagram.com/eic_ocu/" target="_blank">
            <i className="bi bi-instagram fs-1 text-white mx-4"></i>
          </a>
          <a
            href="https://lk.linkedin.com/company/engineering-innovation-club-ocean-university-of-sri-lanka"
            target="_blank"
          >
            <i className="bi bi-linkedin fs-1 text-white ms-4"></i>
          </a>
        </div>
      </div>
    </Container>
  );
};

export default Sidebar;
