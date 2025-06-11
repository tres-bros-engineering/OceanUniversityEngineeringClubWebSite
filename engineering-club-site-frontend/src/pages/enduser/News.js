import { Container, Row } from "react-bootstrap";
import UseTitleName from "../../utils/UseTitleName";
import Slider from "../../components/enduser/slider/Slider";
import PostGrid2 from "../../components/enduser/post grid/PostGrid2";
import Sidebar from "../../components/enduser/sidebar/Sidebar";
import posts from "../../data/PostData.json";

const News = () => {
  UseTitleName("News | OCU Engineering Club");

  // Filter posts by category
  const newsPosts = posts.filter(post => !post.category);

  return (
    <>
      <Container fluid className="p-0 m-0">
        <Row className="p-0 m-0">
          <div className="my-3 p-0" data-aos="fade-up">
            <Slider posts={newsPosts} />
          </div>
        </Row>
        <Row className="p-0 m-0 my-4">
          <div className="col-lg-8" data-aos="fade-up">
            <PostGrid2 posts={newsPosts} />
          </div>
          <div className="col-lg-4">
            <Sidebar />
          </div>
        </Row>
      </Container>
    </>
  );
}

export default News;
